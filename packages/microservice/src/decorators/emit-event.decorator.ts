import { EventBus } from '../event-bus';
import { EmitEventDecoratorException } from '../exceptions/emit-event.decorator.exception';

export function EmitEvent({ context, action }) {
  if (!context || !action) {
    throw new EmitEventDecoratorException('params', 'The \'context\' and action \'properties\' are required.');
  }

  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const eventBusPropName = Object.keys(this)
        .find(key => this[key] instanceof EventBus);

      if (!eventBusPropName) {
        throw new EmitEventDecoratorException('event bus', "If you wish to use '@EmitEvent' decorator you should inject 'EventBus' in your class");
      }

      const result = original.apply(this, args);

      const eventData = {
        context: <string>context, action: <string>action, data: <any>args[0],
      };

      await this[eventBusPropName].publish(eventData);

      return result;
    };

    return descriptor;
  };
}
