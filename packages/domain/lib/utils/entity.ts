import { DomainEntity } from '../domain';

export const isEntity = (target: any): boolean =>
  target.__proto__.name === DomainEntity.name;
