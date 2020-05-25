import { Module, DynamicModule } from '@nestjs/common';
import { MicroserviceOptions } from './interfaces/microservice-options.interface';
import { MICROSERVICE_CONFIG_PROVIDER } from './config/constants.config';
import { MicroserviceCoreModule } from './microservice-core.module';
import { LoggerModule } from './logger';

@Module({})
export class MicroserviceModule {
  static withConfig(config: MicroserviceOptions): DynamicModule {
    const configProvider = {
      provide: MICROSERVICE_CONFIG_PROVIDER,
      useValue: config,
    };

    return {
      module: MicroserviceCoreModule,
      imports: [LoggerModule],
      providers: [configProvider, config.adapter.adapterPrototype],
      exports: [LoggerModule],
    };
  }
}
