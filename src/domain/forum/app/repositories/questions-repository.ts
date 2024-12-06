import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprice/entities/question'

export interface QuestionsRepository {
  findByID(ID: string): Promise<Question | null>
  save(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
}
