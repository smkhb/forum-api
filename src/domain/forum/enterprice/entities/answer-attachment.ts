import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerAttachmentProps {
  answerID: UniqueEntityID
  attachmentID: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerID() {
    return this.props.answerID
  }

  get attachmentID() {
    return this.props.attachmentID
  }

  static create(props: AnswerAttachmentProps, ID?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, ID)

    return attachment
  }
}
