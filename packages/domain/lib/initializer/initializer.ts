import { Class, isEmptyOrNil } from '@kerthin/utils';
import { AbstractRepository } from '../repository';
import { StaticRepository } from '../repository/static-repository';

export type InitializerOptions = {
  RepoAdapter?: Class<AbstractRepository>
}

export async function initializer(options: InitializerOptions) {
  const { RepoAdapter } = options;
  await initRepo(RepoAdapter);
}

async function initRepo(RepoAdapter: Class<AbstractRepository>) {
  if (isEmptyOrNil(RepoAdapter)) return;

  const repo = new RepoAdapter();
  await repo.connect();

  StaticRepository.setRepo(repo);
}
