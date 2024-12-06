import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/app/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprice/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findByID(ID: string) {
    const question = this.items.find((item) => item.ID.toString() === ID)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.ID === question.ID)

    this.items.splice(itemIndex, 1)
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.ID === question.ID)

    this.items[itemIndex] = question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }
}
