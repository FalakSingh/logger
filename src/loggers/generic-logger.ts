import sketch from '@falaksingh/sketch';
import { TConfig, TPayload } from '../types';
import { errorMethods } from '../util/error-methods';

class GenericLogger {
  private enableErrorTrace: boolean;
  private enableLineSeparator: boolean;

  constructor(config?: TConfig) {
    this.enableErrorTrace = config?.enableErrorTrace ?? false;
    this.enableLineSeparator = config?.enableLineSeparator ?? false;
  }

  error(payload: TPayload) {
    let messages: string[] = [];

    if (this.enableErrorTrace && payload instanceof Error) {
      const { path, name, line } = errorMethods.extractErrorMetaData(payload);
      messages.push(this.genericLog(name, 'File[--NAME--]', 'bgYellow', 'yellow'));
      messages.push(this.genericLog(`${path}: [${line}]`, 'File[--PATH--]', 'bgYellow', 'yellow'));
      messages.push(this.genericLog(payload.message, 'Error', 'bgRed', 'red'));
    } else {
      messages.push(this.genericLog(payload, 'Error', 'bgRed', 'red'));
    }

    console.log(messages.join('\n'));

    if (this.enableLineSeparator) this.lineSeparator();
  }

  info(payload: TPayload) {
    this.log(payload, 'Info', 'bgBlue', 'blue');
  }

  success(payload: TPayload) {
    this.log(payload, 'Success', 'bgGreen', 'green');
  }

  private log(payload: TPayload, label: string, bgColor: string, textColor: string) {
    console.log(this.genericLog(payload, label, bgColor, textColor));
    if (this.enableLineSeparator) this.lineSeparator();
  }

  private genericLog(payload: TPayload, label: string, bgColor: string, textColor: string): string {
    return `${sketch(`${label}:`).bold[bgColor].white.text} ${sketch(payload)[textColor].text}`;
  }

  private lineSeparator() {
    console.log(sketch('-'.repeat(100)).white.text);
  }
}

export default GenericLogger;
