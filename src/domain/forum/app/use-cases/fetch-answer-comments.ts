import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprice/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseResquest {
  page: number
  answerID: string
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerID,
  }: FetchAnswerCommentsUseCaseResquest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerID(answerID, {
        page,
      })

    return right({ answerComments })
  }
}
