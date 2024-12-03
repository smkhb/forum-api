import { randomUUID } from "node:crypto"

interface QuestionProps {
  title: string
  content: string 
  authorID: string 
}

export class Question {
  public title: string
  public content: string
  public id: string
  public authorID: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.content = props.content
    this.authorID = props.authorID
    this.id = id ?? randomUUID()
  }
}