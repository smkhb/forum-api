import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionID: UniqueEntityID
}
export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionID() {
    return this.props.questionID
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
