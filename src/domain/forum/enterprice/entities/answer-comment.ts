import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerID: UniqueEntityID
}
export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerID() {
    return this.props.answerID
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
