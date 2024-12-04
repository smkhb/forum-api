import { Answer } from '../../enterprice/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
