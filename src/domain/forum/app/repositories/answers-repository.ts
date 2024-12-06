import { Answer } from '../../enterprice/entities/answer'

export interface AnswersRepository {
  findByID(ID: string): Promise<Answer | null>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
}
