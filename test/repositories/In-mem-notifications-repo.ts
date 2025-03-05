import { NotificationsRepo } from '@/domain/notification/app/repos/notifications-repo'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemNotificationsRepo implements NotificationsRepo {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
