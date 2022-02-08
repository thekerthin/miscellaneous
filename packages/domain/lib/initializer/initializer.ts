import { Class, isEmptyOrNil } from '@kerthin/utils';
import { AbstractRepository, RepoDBConfig } from '../repository';
import { StaticRepository } from '../repository/static-repository';

export type InitializerOptions = {
  RepoAdapter?: Class<AbstractRepository>;
  RepoDBConfig?: RepoDBConfig
};

export async function initializer(options?: InitializerOptions) {
  await initRepo(options);
}

async function initRepo(options: InitializerOptions = {}) {
  if (isEmptyOrNil(options?.RepoAdapter)) return;

  const repo = new options.RepoAdapter();
  await repo.connect(options.RepoDBConfig);

  StaticRepository.setRepo(repo);
}
