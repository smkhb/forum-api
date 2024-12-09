import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorID: UniqueEntityID
  answerID: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class AnswerComment extends Entity<AnswerCommentProps> {
  get authorID() {
    return this.props.authorID
  }

  get answerID() {
    return this.props.answerID
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    ID?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      ID,
    )

    return answerComment
  }
}
