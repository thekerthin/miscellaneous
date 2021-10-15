export const AGGREGATE_TARGET = '__AGGREGATE_TARGET__';

export type AggregateOptions = {
  name: string;
};

export function Aggregate(options: AggregateOptions) {
  return (target: any) => {
    Reflect.defineMetadata(AGGREGATE_TARGET, options, target);
  };
}
