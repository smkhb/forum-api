import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  authorID: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get authorID() {
    return this.props.authorID
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
}
