import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
  questionID: UniqueEntityID
  attachmentID: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionID() {
    return this.props.questionID
  }

  get attachmentID() {
    return this.props.attachmentID
  }

  static create(props: QuestionAttachmentProps, ID?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, ID)

    return attachment
  }
}
