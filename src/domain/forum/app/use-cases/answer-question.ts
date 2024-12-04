import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '../../enterprice/entities/answer'

interface AnswerQuestionUseCaseResquest {
  instructorID: string
  questionID: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorID,
    questionID,
    content,
  }: AnswerQuestionUseCaseResquest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
