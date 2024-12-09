import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprice/entities/answer-comment'

export interface AnswerCommentsRepository {
  findByID(id: string): Promise<AnswerComment | null>
  findManyByAnswerID(
    questionID: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
