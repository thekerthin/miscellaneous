import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    // super(id ? id : uuid.v4());
    // TODO: validate if the entity is for relational or no-relational database
    // super(id ? id : new ObjectId());
    super(id || '010101010101');
  }
}
