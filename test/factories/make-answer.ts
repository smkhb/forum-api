import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprice/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  ID?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorID: new UniqueEntityID(),
      questionID: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    ID,
  )

  return answer
}
