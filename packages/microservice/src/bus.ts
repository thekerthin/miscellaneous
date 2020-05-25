import { ModuleRef } from '@nestjs/core';
import { OnModuleDestroy, Logger } from '@nestjs/common';
import { Class } from './types';
import { IBusAdapter } from './interfaces/bus/bus-adapter.interface';
import { MicroserviceOptions } from './interfaces/microservice-options.interface';
import { MICROSERVICE_CONFIG_PROVIDER } from './config/constants.config';
import { IHandler, IOnInit } from './interfaces';
import { ITransferData } from './interfaces/transfer-data';
import { TransferDataDto } from './interfaces/transfer-data-dto.interface';
import { InitializeAdapterBus } from './services/initialize-adapter-bus.service';
import { CraftsLogger } from './logger/services/logger.service';

export abstract class Bus implements IOnInit, OnModuleDestroy {
  protected readonly microserviceOptions: MicroserviceOptions;

  protected logger: CraftsLogger;

  protected adapter: IBusAdapter;

  constructor(protected readonly moduleRef: ModuleRef) {
    this.microserviceOptions = this.moduleRef.get(MICROSERVICE_CONFIG_PROVIDER);
  }

  abstract publish(data: ITransferData<TransferDataDto>): any;

  protected abstract registerHandlers(): void;

  protected abstract reflectName(
    handler: Class<IHandler>
  ): Class<ITransferData<TransferDataDto>>;

  protected abstract subscribe(handle: IHandler): (data: any) => Promise<any>;

  async onInit(): Promise<void> {
    this.logger = await this.moduleRef.resolve<CraftsLogger>(
      CraftsLogger,
      undefined,
      { strict: false }
    );
    this.logger.setContext(Bus.name);
    await this.resolveAdapter();
    await this.registerHandlers();
  }

  protected async resolveAdapter(): Promise<void> {
    const adapterInstance = await new InitializeAdapterBus(
      this.microserviceOptions,
      this.moduleRef
    ).init(this.microserviceOptions.adapter.adapterConfig);

    this.adapter = adapterInstance;
  }

  protected registerHandler = (handler: Class<IHandler>): void => {
    const instance: IHandler = this.moduleRef.get(handler, { strict: false });

    if (!instance) {
      return;
    }

    const Target = this.reflectName(handler);
    const data = new Target();
    this.adapter.subscribe(this.subscribe(instance), data);
    this.logger.debug({ data }, 'RegisterHandler');
  };

  onModuleDestroy() {
    this.adapter.close();
  }
}
