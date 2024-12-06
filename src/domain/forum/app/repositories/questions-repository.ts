import { Question } from '../../enterprice/entities/question'

export interface QuestionsRepository {
  findByID(ID: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
