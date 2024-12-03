import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  title: string
  content: string 
  slug: Slug
  authorID: string 
}

export class Question {
  public title: string
  public content: string
  public slug: Slug
  public id: string
  public authorID: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.content = props.content
    this.authorID = props.authorID
    this.slug = props.slug
    this.id = id ?? randomUUID()
  }
}