import { IQuery } from './interfaces/queries/query.interface';
import { IQueryDto } from './interfaces/queries/query-dto-interface';

export abstract class Query<T extends IQueryDto> implements IQuery<T> {
  abstract context: string;
  abstract action: string;

  constructor(readonly data: T, readonly cid?: string) {}
}
