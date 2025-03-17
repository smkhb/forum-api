import { NotificationsRepo } from '@/domain/notification/app/repos/notifications-repo'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemNotificationsRepo implements NotificationsRepo {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async findByID(ID: string) {
    const notification = this.items.find((item) => item.ID.toString() === ID)

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === notification.ID,
    )

    this.items[itemIndex] = notification
  }
}
