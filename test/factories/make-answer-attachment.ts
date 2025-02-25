import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprice/entities/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  ID?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerID: new UniqueEntityID(),
      attachmentID: new UniqueEntityID(),
      ...override,
    },
    ID,
  )

  return answerAttachment
}
