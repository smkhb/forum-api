import { AnswerComment } from '../../enterprice/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
