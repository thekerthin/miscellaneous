import { AggregateRoot } from '../domain';

export const isAggregate = (target: any): boolean =>
  target.__proto__.name === AggregateRoot.name;
