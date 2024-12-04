import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprice/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
