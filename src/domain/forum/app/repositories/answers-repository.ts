import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprice/entities/answer'

export interface AnswersRepository {
  findByID(ID: string): Promise<Answer | null>
  findManyByQuestionID(
    questionID: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
}
