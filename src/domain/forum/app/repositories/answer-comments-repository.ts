import { AnswerComment } from '../../enterprice/entities/answer-comment'

export interface AnswerCommentsRepository {
  findByID(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
