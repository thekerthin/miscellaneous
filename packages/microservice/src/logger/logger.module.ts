import { Module } from '@nestjs/common';
import { CraftsLogger } from './services/logger.service';

@Module({
  providers: [
    CraftsLogger,
  ],
  exports: [
    CraftsLogger,
  ],
})
export class LoggerModule { }