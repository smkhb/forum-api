import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprice/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  ID?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionID: new UniqueEntityID(),
      attachmentID: new UniqueEntityID(),
      ...override,
    },
    ID,
  )

  return questionAttachment
}
