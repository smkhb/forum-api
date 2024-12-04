import { Question } from '../../enterprice/entities/question'

export interface QuestionsRepository {
  create(answer: Question): Promise<void>
}
