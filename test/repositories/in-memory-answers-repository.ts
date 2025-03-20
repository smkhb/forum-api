import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprice/entities/answer'
import { AnswerAttachmentsRepository } from '@/domain/forum/app/repositories/answer-attachments-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findByID(ID: string) {
    const answer = this.items.find((item) => item.ID.toString() === ID)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerID(answer.ID.toString())
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.ID)
  }

  async findManyByQuestionID(questionID: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionID.toString() === questionID)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.ID)
  }
}
