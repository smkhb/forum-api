import { UniqueEntityID } from "./unique-entity-id"

export class Entity <Props> {
  private _ID: UniqueEntityID
  protected props: Props

  get ID() {
    return this._ID
  }

  constructor(props: any, ID?: string) {
    this.props = props
    this._ID = new UniqueEntityID(ID)
  }
}