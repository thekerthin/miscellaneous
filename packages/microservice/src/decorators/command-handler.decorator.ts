import { COMMAND_HANDLER_METADATA } from '../config/constants.config';

export function CommandHandler<T>(command: T): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
    };
}
