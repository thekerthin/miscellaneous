export const ENTITY_TARGET = 'ENTITY_TARGET__';

export type EntityOptions = {
  name: string;
};

export function Entity(options: EntityOptions) {
  return (target: any) => {
    Reflect.defineMetadata(ENTITY_TARGET, options, target);
  };
}
