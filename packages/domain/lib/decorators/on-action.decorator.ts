export type OnActionOptions = 'OnCreate' | 'OnUpdate';

export function OnAction <T>(action: OnActionOptions & T) {
  return function(_target, _key, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      this['action'] = action;
      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
