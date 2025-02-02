import GenericLogger from './loggers/generic-logger';
import { TConfig } from './types';

class Logger extends GenericLogger {
  constructor(config: TConfig = {}) {
    super(config);
  }
}
export default Logger;
