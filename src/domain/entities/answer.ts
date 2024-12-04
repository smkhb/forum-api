import { Entity } from "../../core/entities/entity"

interface AnswerProps {
  content: string
  authorID: string
  questionID: string
}
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

}