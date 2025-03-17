import { InMemNotificationsRepo } from 'test/repositories/In-mem-notifications-repo'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemNotificationsRepo: InMemNotificationsRepo
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemNotificationsRepo = new InMemNotificationsRepo()
    sut = new ReadNotificationUseCase(inMemNotificationsRepo)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemNotificationsRepo.create(notification)

    const result = await sut.execute({
      recipientID: notification.recipientID.toString(),
      notificationID: notification.ID.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemNotificationsRepo.items[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientID: new UniqueEntityID('recipient-1'),
    })
    await inMemNotificationsRepo.create(notification)

    const result = await sut.execute({
      notificationID: notification.ID.toString(),
      recipientID: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
