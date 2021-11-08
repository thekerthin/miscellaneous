import { StaticRepository } from './static-repository';
import { FindAndCountOptions, FindOneOptions, FindOptions } from './types';

export abstract class Repository<TEntity> {
  count(): Promise<number> {
    const repo = StaticRepository.getRepo();
    return repo.count();
  }

  find(options?: FindOptions<TEntity>): Promise<TEntity[]> {
    const repo = StaticRepository.getRepo();
    return repo.find(options);
  }

  findOne(options?: FindOneOptions<TEntity>): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.findOne(options);
  }

  findOneById(id: string | number): Promise<TEntity> {
    const repo = StaticRepository.getRepo();
    return repo.findOneById(id);
  }

  findAndCount(
    options?: FindAndCountOptions<TEntity>,
  ): Promise<[TEntity[], number]> {
    const repo = StaticRepository.getRepo();
    return repo.findAndCount(options);
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
