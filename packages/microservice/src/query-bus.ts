import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Bus } from './bus';
import { IQueryHandler } from './interfaces/queries/query-handler.interface';
import { IQuery } from './interfaces/queries/query.interface';
import { IQueryDto } from './interfaces/queries/query-dto-interface';
import {
  QUERY_HANDLER_METADATA,
  BROKER_CONTEXT,
  BROKER_ACTION,
} from './config';
import { ExplorerService } from './services/explore.service';
import { IHandler } from './interfaces';
import { Class } from './types';

@Injectable()
export class QueryBus extends Bus {
  constructor(
    private readonly explorerService: ExplorerService,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  publish(data: IQuery<IQueryDto>): any {
    return this.adapter.publish(data);
  }

  protected registerHandlers(): void {
    const handlers = this.explorerService.getQueryHandlers();
    handlers.forEach(this.registerHandler);
  }

  protected reflectName(
    handler: Type<IQueryHandler<IQuery<IQueryDto>>>
  ): Class<IQuery<IQueryDto>> {
    return Reflect.getMetadata(QUERY_HANDLER_METADATA, handler);
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
