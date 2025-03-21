import { EventHandler } from '@/core/events/event-handler'
import { AnswerCreatedEvent } from '@/domain/forum/enterprice/events/answer-created-event'
import { DomainEvents } from '@/core/events/domain-events'
import { QuestionsRepository } from '@/domain/forum/app/repositories/questions-repository'
import { SendNotificationUseCase } from '@/domain/notification/app/use-case/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findByID(
      answer.questionID.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientID: question.authorID.toString(),
        title: `Nova resposta em ${question.title.substring(0, 40).concat('...')}`,
        content: answer.excerpt,
      })
    }
  }
}
