import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerRepository } from '@/domain/forum/app/repositories/answer-repository'
import { Answer } from '../../enterprice/entities/answer'

interface AnswerQuestionUseCaseResquest {
  instructorID: string
  questionID: string
  content: string
}

export class AnswerQuestionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private answerRepositoru: AnswerRepository) {}

  async execute({
    instructorID,
    questionID,
    content,
  }: AnswerQuestionUseCaseResquest) {
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID),
    })

    await this.answerRepositoru.create(answer)
    return answer
  }
}
