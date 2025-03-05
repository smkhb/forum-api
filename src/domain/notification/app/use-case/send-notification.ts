import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepo } from '../repos/notifications-repo'

interface SendNotificationUseCaseResquest {
  recipientID: string
  title: string
  content: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  { notification: Notification }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepo) {}

  async execute({
    recipientID,
    title,
    content,
  }: SendNotificationUseCaseResquest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientID: new UniqueEntityID(recipientID),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
