import { QuestionComment } from '../../enterprice/entities/question-comment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
