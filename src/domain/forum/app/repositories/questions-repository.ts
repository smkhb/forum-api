import { Question } from '../../enterprice/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
