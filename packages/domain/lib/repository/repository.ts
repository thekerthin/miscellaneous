import { StaticRepository } from './static-repository';
import { CountOptions, FilterQuery, FindOneOptions, FindOptions } from './types';

export abstract class Repository<TEntity> {
  count(where: FilterQuery<TEntity>, options?: CountOptions<TEntity>): Promise<number> {
    const repo = StaticRepository.getRepo();
    return repo.count(where, options);
  }

  find(where: FilterQuery<TEntity>, options?: FindOptions<TEntity>): Promise<TEntity[]> {
    const repo = StaticRepository.getRepo();
    return repo.find(where, options);
  }

  findOne(
    where: FilterQuery<TEntity>, options?: FindOneOptions<TEntity>
  ): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.findOne(where, options);
  }

  findOneById(id: string | number): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.findOneById(id);
  }

  findAndCount(
    where: FilterQuery<TEntity>, options?: FindOptions<TEntity>
  ): Promise<[TEntity[], number]> {
    const repo = StaticRepository.getRepo();
    return repo.findAndCount(where, options);
  }

  insert(data: Partial<TEntity>): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.insert(data);
  }

  update(data: Partial<TEntity>): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.update(data);
  }

  delete(data: string | number | Partial<TEntity>): Promise<null> {
    const repo = StaticRepository.getRepo();
    return repo.delete(data);
  }
}
