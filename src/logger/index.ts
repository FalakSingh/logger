import sketch from '@falaksingh/sketch';
import { TConfig, TPayload } from '../types';
import errorMethods from '../util/error-methods';
import DiskWriter from '../helpers/disk-writer';
import { timestamp } from '../util/timestamp';

class Logger {
  private parseErrorInstance: boolean;
  private enableLineSeparator: boolean;
  private diskWriter: DiskWriter | null;
  private enableTerminalColorizer: boolean;

  constructor(config: TConfig) {
    const {
      parseErrorInstance = false,
      enableLineSeparator = false,
      writeToDisk,
      enableTerminalColorizer = false,
    } = config;

    this.parseErrorInstance = parseErrorInstance;
    this.enableLineSeparator = enableLineSeparator;
    this.enableTerminalColorizer = enableTerminalColorizer;

    if (writeToDisk?.enable) {
      const { infoFilePath = 'logs/info.log', errorfilePath = 'logs/error.log' } = writeToDisk;
      this.diskWriter = new DiskWriter(errorfilePath, infoFilePath);
    } else {
      this.diskWriter = null;
    }
  }

  preProcessPayload(payload: TPayload, type: 'error' | 'info' | 'success') {
    if (this.diskWriter) {
      let content: string = '';
      if (type === 'error') {
        if (this.parseErrorInstance && payload instanceof Error) {
          const { line, name, path } = errorMethods.extractErrorMetaData(payload);
          content = `${timestamp()}\nFile[--NAME--]: ${name}\nFile[--PATH--]: ${path}: [${line}]\nerror: ${payload.message}`;
        } else {
          content = `${timestamp()}\n${type}: ${this.formatText(payload)}`;
        }
      } else {
        content = `${timestamp()}\n${type}: ${this.formatText(payload)}`;
      }
      this.diskWriter.write(content, type);
    }
  }

  error(payload: TPayload) {
    this.preProcessPayload(payload, 'error');
    if (this.parseErrorInstance && payload instanceof Error) {
      console.log(this.formatErrorLog(payload));
    } else {
      console.log(this.formatLog(payload, 'Error', 'bgRed', 'red'));
    }
    if (this.enableLineSeparator) this.lineSeparator();
  }

  info(payload: TPayload) {
    this.preProcessPayload(payload, 'info');
    console.log(this.formatLog(payload, 'Info', 'bgBlue', 'blue'));
    if (this.enableLineSeparator) this.lineSeparator();
  }

  success(payload: TPayload) {
    this.preProcessPayload(payload, 'success');
    console.log(this.formatLog(payload, 'Success', 'bgGreen', 'green'));
    if (this.enableLineSeparator) this.lineSeparator();
  }

  private formatLog(payload: TPayload, label: string, bgColor: string, textColor: string): string {
    if (this.enableTerminalColorizer) {
      return `${sketch(`${label}:`).bold[bgColor].white.text} ${sketch(payload)[textColor].text}`;
    } else {
      return `${label}: ${this.formatText(payload)}`;
    }
  }

  private formatText(payload: TPayload) {
    return typeof payload === 'object' ? JSON.stringify(payload, null, 2) : payload;
  }

  private formatErrorLog(err: Error) {
    let messages: string[] = [];
    const { path, name, line } = errorMethods.extractErrorMetaData(err);
    messages.push(this.formatLog(name, 'File[--NAME--]', 'bgYellow', 'yellow'));
    messages.push(this.formatLog(`${path}: [${line}]`, 'File[--PATH--]', 'bgYellow', 'yellow'));
    messages.push(this.formatLog(err.message, 'Error', 'bgRed', 'red'));
    return messages.join('\n');
  }

  private lineSeparator() {
    console.log(sketch('-'.repeat(100)).white.text);
  }
}

export default Logger;
