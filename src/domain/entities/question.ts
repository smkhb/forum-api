import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface QuestionProps {
  authorID: UniqueEntityID
  bestAnswerID?: UniqueEntityID
  title: string
  content: string 
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question  extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, ID?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, ID)
    
    return question
  }
}