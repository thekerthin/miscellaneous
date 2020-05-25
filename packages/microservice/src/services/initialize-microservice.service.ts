import { Injectable } from '@nestjs/common';
import { CommandBus } from '../command-bus';
import { EventBus } from '../event-bus';
import { BrokerService } from './broker/broker.service';
import { QueryBus } from '../query-bus';

@Injectable()
export class InitializeMicroservice {
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly brokerService: BrokerService
  ) {}

  async init() {
    await this.eventBus.onInit();
    await this.commandBus.onInit();
    await this.queryBus.onInit();
    await this.brokerService.onInit();
  }
}
