import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Bus } from './bus';
import { IEventHandler } from './interfaces/events/event-handler.interface';
import { IEvent } from './interfaces/events/event.interface';
import { IEventDto } from './interfaces/events/event-dto.interface';
import { EVENT_HANDLER_METADATA } from './config';
import { ExplorerService } from './services/explore.service';
import { IHandler } from './interfaces';
import { Class } from './types'

@Injectable()
export class EventBus extends Bus {

  constructor(
    private readonly explorerService: ExplorerService,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  publish(data: IEvent<IEventDto>): any {
    return this.adapter.publish(data);
  }

  protected registerHandlers(): void {
    const handlers = this.explorerService.getEventHandlers();
    handlers.forEach(this.registerHandler);
  }

  protected reflectName(handler: Type<IEventHandler<IEvent<IEventDto>>>): Class<IEvent<IEventDto>> {
    return Reflect.getMetadata(EVENT_HANDLER_METADATA, handler);
  }

  protected subscribe = (handle: IHandler<any>): (data: any) => Promise<any> => async (data: any): Promise<any> => {
    return handle.handle(data);
  }

}
