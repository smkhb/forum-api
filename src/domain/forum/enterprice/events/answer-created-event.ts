import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvent {
  public readonly ocurredAt: Date
  public readonly answer: Answer

  constructor(answer: Answer) {
    this.ocurredAt = new Date()
    this.answer = answer
  }

  getAggregateID(): UniqueEntityID {
    return this.answer.ID
  }
}
