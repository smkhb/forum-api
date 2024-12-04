import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface AnswerProps {
  authorID: UniqueEntityID
  questionID: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, ID?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, ID)
    
    return answer
  }

}