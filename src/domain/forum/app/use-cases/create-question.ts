import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprice/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprice/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprice/entities/question-attachment-list'

interface CreateQuestionUseCaseResquest {
  authorID: string
  title: string
  content: string
  attachmentsIDs: string[]
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    title,
    content,
    attachmentsIDs,
  }: CreateQuestionUseCaseResquest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorID: new UniqueEntityID(authorID),
      title,
      content,
    })

    const questionAttachments = attachmentsIDs.map((attachmentsID) => {
      return QuestionAttachment.create({
        attachmentID: new UniqueEntityID(attachmentsID),
        questionID: question.ID,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
