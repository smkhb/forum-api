import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprice/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseResquest {
  page: number
  questionID: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionID,
  }: FetchQuestionCommentsUseCaseResquest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionID(questionID, {
        page,
      })

    return right({ questionComments })
  }
}
