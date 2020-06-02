import { Class } from '@kerthin/utils';
import { Consumer } from '../consumer';

export interface SecurityModuleConfig {
  consumer: Class<Consumer>;
}
