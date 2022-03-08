import { isEmptyOrNil } from '@kerthin/utils';
import { ObjectId } from 'mongodb';
import { createUniqueID } from '../utils/unique-entity-id';
import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | ObjectId> {
  constructor(id?: string | ObjectId) {
    super(
      isEmptyOrNil(id)
        ? createUniqueID()
        : ObjectId.isValid(id) && typeof id === 'string'
          ? new ObjectId(id)
          : id
    );
  }
}
