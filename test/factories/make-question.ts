import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprice/entities/question'
import { Slug } from '@/domain/forum/enterprice/entities/value-objects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorID: new UniqueEntityID(),
    title: 'Example Question',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override,
  })

  return question
}
