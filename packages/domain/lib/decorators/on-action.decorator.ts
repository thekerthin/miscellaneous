import { Actions } from '../utils';

export function OnAction <T>(action: 'onCreate' | 'onUpdate' & T) {
  return function(_target, _key, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      this['action'] = action === 'onCreate'
        ? Actions.ON_CREATE
        : action === 'onUpdate'
          ? Actions.ON_UPDATE
          : action;
      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
