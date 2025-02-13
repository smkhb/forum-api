import { Either, right } from '@/core/either'
import { Answer } from '../../enterprice/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersUseCaseResquest {
  page: number
  questionID: string
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionID,
  }: FetchQuestionAnswersUseCaseResquest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionID(
      questionID,
      { page },
    )

    return right({ answers })
  }
}
