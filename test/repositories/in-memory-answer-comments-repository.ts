import { AnswerCommentsRepository } from '@/domain/forum/app/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprice/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
