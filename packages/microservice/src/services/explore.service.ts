import { Injectable } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { ICommandHandler } from '../interfaces/commands/command-handler.interface';
import { ICommandDto } from '../interfaces/commands/command-dto-interface';
import { IEventHandler } from '../interfaces/events/event-handler.interface';
import { IEventDto } from '../interfaces/events/event-dto.interface';
import { COMMAND_HANDLER_METADATA, EVENT_HANDLER_METADATA, QUERY_HANDLER_METADATA } from '../config';
import { ICommand, IEvent, IHandler, IQueryHandler, IQuery, IQueryDto } from '../interfaces';
import { Class } from '../types';

@Injectable()
export class ExplorerService {

  constructor(private readonly modulesContainer: ModulesContainer) { }

  getCommandHandlers(): Class<ICommandHandler<ICommand<ICommandDto>>>[] {
    const modules = [...this.modulesContainer.values()];
    const commands = this.flatMap<Class<IHandler>>(modules, instance =>
      this.filterProvider(instance, COMMAND_HANDLER_METADATA)
    );

    return commands;
  }

  getEventHandlers(): Class<IEventHandler<IEvent<IEventDto>>>[] {
    const modules = [...this.modulesContainer.values()];
    const events = this.flatMap<IEventHandler<IEvent<IEventDto>>>(modules, instance =>
      this.filterProvider(instance, EVENT_HANDLER_METADATA)
    );
    return events;
  }

  getQueryHandlers(): Class<IQueryHandler<IQuery<IQueryDto>>>[] {
    const modules = [...this.modulesContainer.values()];
    const queries = this.flatMap<IQueryHandler<IQuery<IQueryDto>>>(modules, instance =>
      this.filterProvider(instance, QUERY_HANDLER_METADATA)
    );
    return queries;
  }

  getCommands(): Class<ICommand<ICommandDto>>[] {
    return this.getCommandHandlers()
      .map(handler => Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler));
  }

  getEvents(): Class<IEvent<IEventDto>>[] {
    return this.getEventHandlers()
      .map(handler => Reflect.getMetadata(EVENT_HANDLER_METADATA, handler));
  }

  getQueries(): Class<IQuery<IQueryDto>>[] {
    return this.getQueryHandlers()
      .map(handler => Reflect.getMetadata(QUERY_HANDLER_METADATA, handler));
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Class<IHandler>
  ): Class<IHandler>[] {
    const items = modules
      .map(module => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter(element => !!element);
  }

  filterProvider(
    wrapper: InstanceWrapper,
    metadataKey: string
  ): Class<IHandler> {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extractMetadata(instance, metadataKey);
  }

  extractMetadata(instance: Object, metadataKey: string): Class<IHandler> {
    if (!instance.constructor) {
      return undefined;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    return metadata ? (instance.constructor as Class<IHandler>) : undefined;
  }

}
