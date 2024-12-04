import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

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

}