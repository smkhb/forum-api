import { randomUUID } from "node:crypto"

export class Entity <Props> {
  private _ID: string
  protected props: Props

  get ID() {
    return this._ID
  }

  constructor(props: any, ID?: string) {
    this.props = props
    this._ID = ID ?? randomUUID()
  }
}