import { Class } from '../types';
import { IBusAdapter, IEvent, IEventDto } from '../interfaces';

export interface IManagerAdapterBusWithConfig<T = any> {
  withConfig(config: T): IManagerAdapterBusWithSagaConfig;
  build(): IAdapterBusConfig;
}

export interface IManagerAdapterBusWithSagaConfig<T = any> {
  withSagaConfig(config: T): IManagerAdapterBusBuild;
}

export interface IAdapterBusSagaConfig<T = any> {
  config: T;
  events: Class<IEvent<IEventDto>>[];
}

export interface IAdapterBusConfig<T = any> {
  adapterPrototype: Class<IBusAdapter>;
  adapterConfig: T;
  adapterBrokerConfig?: T;
}

export interface IManagerAdapterBusBuild {
  build(): IAdapterBusConfig;
}

export class ManagerAdapterBus<T = any>
  implements
    IManagerAdapterBusWithConfig<T>,
    IManagerAdapterBusWithSagaConfig<T>,
    IManagerAdapterBusBuild {
  private adapterConfig: T;

  private adapterBrokerConfig: T;

  private constructor(private readonly prototype: Class<IBusAdapter>) {}

  static getInstance<T = any>(
    prototype: Class<IBusAdapter>
  ): IManagerAdapterBusWithConfig {
    return new ManagerAdapterBus<T>(prototype);
  }

  withConfig(config: T): IManagerAdapterBusWithSagaConfig {
    this.adapterConfig = config;
    return this;
  }

  withSagaConfig(config: T): IManagerAdapterBusBuild {
    this.adapterBrokerConfig = config;
    return this;
  }

  build(): IAdapterBusConfig {
    return {
      adapterPrototype: this.prototype,
      adapterConfig: this.adapterConfig,
      adapterBrokerConfig: this.adapterBrokerConfig,
    };
  }
}
