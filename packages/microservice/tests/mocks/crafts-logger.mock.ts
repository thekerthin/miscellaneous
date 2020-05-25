import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class CraftsLoggerMock extends Logger {
  log(message: string) {
  }
  error(message: string, trace: string) {
  }
  warn(message: string) {
  }
  debug(message: string) {
  }
  verbose(message: string) {
  }
}