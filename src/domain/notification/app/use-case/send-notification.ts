import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepo } from '../repos/notifications-repo'

export interface SendNotificationUseCaseRequest {
  recipientID: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  { notification: Notification }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepo: NotificationsRepo) {}

  async execute({
    recipientID,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientID: new UniqueEntityID(recipientID),
      title,
      content,
    })

    await this.notificationsRepo.create(notification)

    return right({ notification })
  }
}
