import { FindAndCountOptions, FindOneOptions, FindOptions } from './types';

export abstract class AbstractRepository<TEntity = any> {
  protected abstract connection: any;

  abstract connect(): Promise<void>;

  abstract count(): Promise<number>;

  abstract find(options?: FindOptions<TEntity>): Promise<Array<TEntity>>;

  abstract findOne(options?: FindOneOptions<TEntity>): Promise<TEntity>;

  abstract findOneById(id: string | number): Promise<TEntity>;

  abstract findAndCount(
    options?: FindAndCountOptions<TEntity>,
  ): Promise<[Array<TEntity>, number]>;

  abstract insert(data: Partial<TEntity>): Promise<TEntity | null>;

  abstract update(data: Partial<TEntity>): Promise<TEntity | null>;

  abstract delete(data: Partial<TEntity> | string | number): Promise<null>;
}
