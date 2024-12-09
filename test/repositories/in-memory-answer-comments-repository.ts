import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/app/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprice/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findByID(ID: string) {
    const answerComment = this.items.find((item) => item.ID.toString() === ID)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerID(answerID: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerID.toString() === answerID)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === answerComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}
