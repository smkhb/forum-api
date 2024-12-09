import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprice/entities/answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  ID?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      authorID: new UniqueEntityID(),
      answerID: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    ID,
  )

  return answerComment
}
