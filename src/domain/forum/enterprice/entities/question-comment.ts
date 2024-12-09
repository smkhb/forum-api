import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
  authorID: UniqueEntityID
  questionID: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class QuestionComment extends Entity<QuestionCommentProps> {
  get authorID() {
    return this.props.authorID
  }

  get questionID() {
    return this.props.questionID
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
    props: Optional<QuestionCommentProps, 'createdAt'>,
    ID?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      ID,
    )

    return questionComment
  }
}
