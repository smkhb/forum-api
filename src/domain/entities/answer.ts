import { randomUUID } from "node:crypto"

interface AnswerProps {
  content: string
  authorID: string
  questionID: string
}
export class Answer {
  public content: string
  public id: string
  public authorID: string
  public questionID: string

  constructor(props: AnswerProps, id?: string) {
    this.content = props.content
    this.authorID = props.authorID
    this.questionID = props.questionID
    this.id = id ?? randomUUID()
  }
}