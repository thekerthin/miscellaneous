import { AbstractRepository } from './abstract-repository';

export class StaticRepository {

  private static _repo: AbstractRepository;

  static setRepo(repo: AbstractRepository) {
    StaticRepository._repo = repo;
  }

  static getRepo(): AbstractRepository {
    return StaticRepository._repo;
  }

}
