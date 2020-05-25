import { Module, OnModuleInit, Global } from '@nestjs/common';
import { BrokerService } from './services/broker/broker.service';
import { InitializeMicroservice } from './services/initialize-microservice.service';
import { CommandBus, EventBus, QueryBus } from '.';
import { ExplorerService } from './services/explore.service';

@Global()
@Module({
  providers: [
    CommandBus,
    EventBus,
    QueryBus,
    ExplorerService,
    BrokerService,
    InitializeMicroservice,
  ],
  exports: [EventBus, BrokerService],
})
export class MicroserviceCoreModule implements OnModuleInit {
  constructor(
    private readonly initializeMicroservice: InitializeMicroservice
  ) {}

  async onModuleInit() {
    await this.initializeMicroservice.init();
  }
}
