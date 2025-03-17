import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprice/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachment } from '../../enterprice/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachmentList } from '../../enterprice/entities/question-attachment-list'

interface EditQuestionUseCaseResquest {
  authorID: string
  questionID: string
  title: string
  content: string
  attachmentsIDs: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorID,
    questionID,
    title,
    content,
    attachmentsIDs,
  }: EditQuestionUseCaseResquest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== question.authorID.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionID(questionID)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIDs.map((attachmentsID) => {
      return QuestionAttachment.create({
        attachmentID: new UniqueEntityID(attachmentsID),
        questionID: question.ID,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
