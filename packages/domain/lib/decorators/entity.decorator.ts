import { merge } from 'ramda';
import { Metadata } from '../utils';

export type EntityOptions = {
  name: string;
};

export function Entity(options: EntityOptions) {
  return (target: any) => {
    const meta = Metadata.getTargetMetadata(target);
    Metadata.addTargetMetadata(target, merge(options, meta));
  };
}
