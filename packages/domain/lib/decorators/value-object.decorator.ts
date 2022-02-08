import { Class } from '@kerthin/utils';
import { Actions, Metadata } from '../utils';
import { Validator } from '../validators';

export type ValueObjectOptions = {
  [key in Actions]?: Array<Class<Validator>>
}

export function ValueObject(options?: ValueObjectOptions) {
  return  (target: any) => {
    const meta = {
      validators: options
    };
    Metadata.addTargetMetadata(target, meta);
  };
}
