import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprice/entities/question-comment'

export interface QuestionCommentsRepository {
  findByID(ID: string): Promise<QuestionComment | null>
  findManyByQuestionID(
    questionID: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
