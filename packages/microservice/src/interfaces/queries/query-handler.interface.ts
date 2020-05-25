import { IQuery } from './query.interface';
import { IQueryDto } from './query-dto-interface';
import { IHandler } from '../handler.interface';

export interface IQueryHandler<T extends IQuery<IQueryDto>> extends IHandler<T> {
  handle(event: T): void;
}
