import ObjectID from 'bson-objectid';
import { createUniqueID } from '../utils/unique-entity-id';
import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | ObjectID> {
  constructor(id?: string | ObjectID) {
    super(id || createUniqueID());
  }
}
