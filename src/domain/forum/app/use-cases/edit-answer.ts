import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprice/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprice/entities/answer-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '../../enterprice/entities/answer-attachment'

interface EditAnswerUseCaseResquest {
  authorID: string
  answerID: string
  content: string
  attachmentsIDs: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorID,
    answerID,
    content,
    attachmentsIDs,
  }: EditAnswerUseCaseResquest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== answer.authorID.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerID(answerID)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIDs.map((attachmentsID) => {
      return AnswerAttachment.create({
        attachmentID: new UniqueEntityID(attachmentsID),
        answerID: answer.ID,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
