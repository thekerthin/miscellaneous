import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Bus } from './bus';
import { ICommandHandler } from './interfaces/commands/command-handler.interface';
import { ICommand } from './interfaces/commands/command.interface';
import { ICommandDto } from './interfaces/commands/command-dto-interface';
import {
  COMMAND_HANDLER_METADATA,
  BROKER_CONTEXT,
  BROKER_ACTION,
} from './config';
import { ExplorerService } from './services/explore.service';
import { IHandler } from './interfaces';
import { Class } from './types';

@Injectable()
export class CommandBus extends Bus {
  constructor(
    private readonly explorerService: ExplorerService,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  publish(data: ICommand<ICommandDto>): any {
    return this.adapter.publish(data);
  }

  protected registerHandlers(): void {
    const handlers = this.explorerService.getCommandHandlers();
    handlers.forEach(this.registerHandler);
  }

  protected reflectName(
    handler: Type<ICommandHandler<ICommand<ICommandDto>>>
  ): Class<ICommand<ICommandDto>> {
    return Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
  }

  protected subscribe = (
    handle: IHandler<any>
  ): ((data: any) => Promise<any>) => async (data: any): Promise<any> => {
    const context = BROKER_CONTEXT;
    const action = BROKER_ACTION;
    try {
      const result = await handle.handle(data);
      const eventData = { data: result, cid: data.cid, action, context };
      await this.adapter.publish(eventData);
    } catch (error) {
      let eventData = {
        ...data,
        action,
        context,
        error: error.message,
        code: error.code,
      };
      await this.adapter.publish(eventData);
    }
  };
}
