import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../entities/question'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public readonly ocurredAt: Date
  public readonly question: Question
  public readonly bestAnswerID: UniqueEntityID

  constructor(question: Question, bestAnswerID: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.question = question
    this.bestAnswerID = bestAnswerID
  }

  getAggregateID(): UniqueEntityID {
    return this.question.ID
  }
}
