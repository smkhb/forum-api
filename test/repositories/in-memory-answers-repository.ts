import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprice/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findByID(ID: string) {
    const answer = this.items.find((item) => item.ID.toString() === ID)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

    this.items[itemIndex] = answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
