import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import {
  MICROSERVICE_CONFIG_PROVIDER,
  BROKER_CONTEXT,
  BROKER_ACTION,
} from '../../config/constants.config';
import {
  MicroserviceOptions,
  IBusAdapter,
  IOnInit,
  IBrokerStart,
} from '../../interfaces';
import { Broker } from './broker';
import { BrokerProcess } from './broker-process';
import { ITransferData } from '../../interfaces/transfer-data';
import { TransferDataDto } from '../../interfaces/transfer-data-dto.interface';
import { InitializeAdapterBus } from '../initialize-adapter-bus.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class BrokerService implements IOnInit, OnModuleDestroy {
  private adapterInstance: IBusAdapter;

  constructor(
    @Inject(MICROSERVICE_CONFIG_PROVIDER)
    private readonly microserviceOptions: MicroserviceOptions,
    private readonly moduleRef: ModuleRef
  ) {}

  async onInit() {
    const adapterInstance = await new InitializeAdapterBus(
      this.microserviceOptions,
      this.moduleRef
    ).init(this.microserviceOptions.adapter.adapterBrokerConfig);
    const config = {
      context: BROKER_CONTEXT,
      action: BROKER_ACTION,
      data: null,
    };
    const options = { service: 'broker' };
    adapterInstance.subscribe(this.subscribe, config, options);
    this.adapterInstance = adapterInstance;
  }

  private subscribe = async (data: ITransferData<TransferDataDto>) => {
    const brokers = Broker.getInstance();
    const handle = brokers.get(data.cid);
    if (typeof handle !== 'function') {
      return;
    }
    await handle(data);
    brokers.delete(data.cid);
  };

  start(): IBrokerStart {
    const brokerProcess = new BrokerProcess(this.adapterInstance);

    return brokerProcess;
  }

  onModuleDestroy() {
    this.adapterInstance.close();
  }
}
