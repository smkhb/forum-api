import { QuestionComment } from '../../enterprice/entities/question-comment'

export interface QuestionCommentsRepository {
  findByID(ID: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
