import { QuestionsRepository } from '@/domain/forum/app/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprice/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}
