import { QuestionCommentsRepository } from '@/domain/forum/app/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprice/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
