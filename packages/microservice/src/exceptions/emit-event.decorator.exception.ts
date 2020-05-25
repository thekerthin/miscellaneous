export type Type = 'params' | 'event bus';

export class EmitEventDecoratorException extends Error {
  public type: string;

  constructor(type: Type, message: string) {
    super(message);
    this.type = type;
  }

}
