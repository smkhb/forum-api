import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _ID: UniqueEntityID
  protected props: Props

  get ID() {
    return this._ID
  }

  protected constructor(props: Props, ID?: UniqueEntityID) {
    this.props = props
    this._ID = ID ?? new UniqueEntityID()
  }
}
