import {
  CountOptions,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  RepoDBConfig
} from './types';

export abstract class AbstractRepository<TEntity = any> {
  protected abstract connection: any;

  abstract connect(config: RepoDBConfig): Promise<void>;

  abstract count(
    where: FilterQuery<TEntity>, options?: CountOptions<TEntity>
  ): Promise<number>

  abstract find(
    where: FilterQuery<TEntity>, options?: FindOptions<TEntity>
  ): Promise<Array<TEntity>>;

  abstract findOne(
    where: FilterQuery<TEntity>, options?: FindOneOptions<TEntity>
  ): Promise<TEntity>;

  abstract findOneById(id: string | number): Promise<TEntity>;

  abstract findAndCount(
    where: FilterQuery<TEntity>, options?: FindOptions<TEntity>
  ): Promise<[Array<TEntity>, number]>;

  abstract insert(data: Partial<TEntity>): Promise<TEntity | null>;

  abstract update(data: Partial<TEntity>): Promise<TEntity | null>;

  abstract delete(data: Partial<TEntity> | string | number): Promise<null>;
}
