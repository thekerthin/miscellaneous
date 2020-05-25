import { EVENT_HANDLER_METADATA } from '../config/constants.config';

export function EventHandler<T>(event: T): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(EVENT_HANDLER_METADATA, event, target);
    };
}
