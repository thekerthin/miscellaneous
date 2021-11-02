import { merge } from 'ramda';
import { Metadata } from '../utils';
import { EntityOptions } from './entity.decorator';

export type AggregateOptions = EntityOptions;

export function Aggregate(options: AggregateOptions) {
  return (target: any) => {
    const meta = Metadata.getTargetMetadata(target);
    Metadata.addTargetMetadata(target, merge(options, meta));
  };
}
