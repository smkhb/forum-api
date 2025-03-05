import { InMemNotificationsRepo } from 'test/repositories/In-mem-notifications-repo'
import { SendNotificationUseCase } from './send-notification'

let inMemNotificationsRepo: InMemNotificationsRepo
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemNotificationsRepo = new InMemNotificationsRepo()
    sut = new SendNotificationUseCase(inMemNotificationsRepo)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientID: '1',
      title: 'notification title',
      content: 'notification content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemNotificationsRepo.items[0]).toEqual(result.value?.notification)
  })
})
