import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepo {
  create(notification: Notification): Promise<void>
}
