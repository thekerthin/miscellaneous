import { QUERY_HANDLER_METADATA } from '../config/constants.config';

export function QueryHandler<T>(query: T): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target);
  };
}
