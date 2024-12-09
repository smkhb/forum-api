import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprice/entities/question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  ID?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorID: new UniqueEntityID(),
      questionID: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    ID,
  )

  return questionComment
}
