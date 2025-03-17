import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepo } from '../repos/notifications-repo'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ReadNotificationUseCaseResquest {
  recipientID: string
  notificationID: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepo: NotificationsRepo) {}

  async execute({
    recipientID,
    notificationID,
  }: ReadNotificationUseCaseResquest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepo.findByID(notificationID)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientID !== notification.recipientID.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepo.save(notification)

    return right({ notification })
  }
}
