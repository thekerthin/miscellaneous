import { ValidatorExecutor, ValueObjectValidator } from './validate';

export interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {

  protected validator = new ValidatorExecutor(new ValueObjectValidator());

  constructor(protected readonly value: T) {}

  abstract toValue():
    | string
    | number
    | boolean
    | Array<string | number | boolean>;

  abstract validate(): void;

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }

}
