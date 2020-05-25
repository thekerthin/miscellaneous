export interface IHandler<T = any> {
  handle(event: T): any;
}
