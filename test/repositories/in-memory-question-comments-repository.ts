import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/app/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprice/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findManyByQuestionID(questionID: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionID.toString() === questionID)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findByID(ID: string) {
    const questionComment = this.items.find((item) => item.ID.toString() === ID)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === questionComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}
