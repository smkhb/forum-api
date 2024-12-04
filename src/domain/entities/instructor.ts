import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface InstructorProps {
  name: string
}

export class Instrotuctor extends Entity<InstructorProps> {
  static create(props: InstructorProps, ID?: UniqueEntityID) {
    const instrotuctor = new Instrotuctor(props, ID)
    
    return instrotuctor
  }
}