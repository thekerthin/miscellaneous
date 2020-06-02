import { DynamicModule } from '@nestjs/common';

import { SecurityCoreModule } from './security-core.module';
import { SecurityModuleConfig } from './interfaces';
import { Consumer } from './consumer';

export class SecurityModule {
  static withConfig(config: SecurityModuleConfig): DynamicModule {
    const consumerProvider = {
      provide: Consumer,
      useClass: config.consumer,
    };

    return {
      module: SecurityCoreModule,
      providers: [consumerProvider],
      exports: [consumerProvider],
    };
  }
}
