import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

interface QuestionProps {
  title: string
  content: string 
  slug: Slug
  authorID: string 
}

export class Question  extends Entity<QuestionProps> {

}