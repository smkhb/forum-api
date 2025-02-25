import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '../../enterprice/entities/answer'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprice/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprice/entities/answer-attachment-list'

interface AnswerQuestionUseCaseResquest {
  instructorID: string
  questionID: string
  attachmentsIDs: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorID,
    questionID,
    content,
    attachmentsIDs,
  }: AnswerQuestionUseCaseResquest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID),
    })

    const answerAttachments = attachmentsIDs.map((attachmentsID) => {
      return AnswerAttachment.create({
        attachmentID: new UniqueEntityID(attachmentsID),
        answerID: answer.ID,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}
