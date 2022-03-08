import { ObjectId } from 'mongodb';
import { createUniqueID } from '../utils/unique-entity-id';
import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | ObjectId> {
  constructor(id?: string | ObjectId) {
    super(id || createUniqueID());
  }
}
