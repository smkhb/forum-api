import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domain-events'
import { SendNotificationUseCase } from '@/domain/notification/app/use-case/send-notification'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprice/events/question-best-answer-chosen-event'
import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'

export class OnBestQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestNotification({
    question,
    bestAnswerID,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findByID(
      bestAnswerID.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientID: answer.authorID.toString(),
        title: `Sua resposta foi escolhida`,
        content: `A resposta que você enviou em ${question.title.substring(0, 20).concat('...')} foi escolhida como a melhor resposta`,
      })
    }
  }
}
