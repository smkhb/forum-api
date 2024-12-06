import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprice/entities/question'
import { Slug } from '@/domain/forum/enterprice/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  ID?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorID: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create(faker.lorem.slug()),
      ...override,
    },
    ID,
  )

  return question
}
