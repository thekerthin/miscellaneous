import { Actions, Metadata } from '../utils';
import { ValidationResult } from '../validators';

export type ValueObjectOptions = {
  [key in Actions]?: Array<(value: any) => ValidationResult>
}

export function ValueObject(options?: ValueObjectOptions) {
  return  (target: any) => {
    const meta = {
      validators: options
    };
    Metadata.addTargetMetadata(target, meta);
  };
}
