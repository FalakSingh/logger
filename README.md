# Logger Utility

A simple and customizable logging utility for Node.js applications. This logger provides different methods for logging errors, info, and success messages with optional features like error trace, line separators, terminal colorization, and writing logs to disk.

## Installation

To use this logger in your project, you can install it via npm:

```bash
npm install @falaksingh/logger
```

### Usage:

#### Importing the `Logger`
First, import the `Logger` class from the module:

```javascript
import Logger from '@falaksingh/logger';
```

#### Creating a Logger Instance
You can create an instance of the Logger class with optional configuration:

```javascript
const logger = new Logger({
  parseErrorInstance: true,
  enableLineSeparator: true,
  enableTerminalColorizer: true,
  writeToDisk: { enable: true, errorfilePath: 'logs/error.log', infoFilePath: 'logs/info.log' },
});
```

### Logging Messages

The logger provides several methods for logging different types of messages:

#### `Error Logging`
Logs error messages. If `parseErrorInstance` is set to `true`, it will also log the file path and line number where the error occurred.

```javascript
logger.error(new Error('This is an error message'));
logger.error('This is a plain text error message');
```

#### `Info Logging`
Logs informational messages.

```javascript
logger.info('This is an info message');
```

#### `Success Logging`
Logs success messages.

```javascript
logger.success({ type: 'Fiat', model: '500', color: 'white' });
```

### Configuration Options

The `Logger` class accepts the following configuration options:

- `parseErrorInstance` (boolean): If set to `true`, the logger will include the file path and line number in error logs. Default is `false`.
- `enableLineSeparator` (boolean): If set to `true`, the logger will add a line separator after each log message. Default is `false`.
- `enableTerminalColorizer` (boolean): If set to `true`, log messages will be colorized in the terminal. Default is `false`.
- `writeToDisk` (object): If enabled, logs will be written to disk. Default is `disabled`.
  - `errorfilePath` (string): Path for storing error logs. Default is `'logs/error.log'`.
  - `infoFilePath` (string): Path for storing info logs. Default is `'logs/info.log'`.
  - `enable` (boolean): Enables writing logs to disk. Default is `false`.

### Additional Features

#### `Writing Logs to Disk`
If `writeToDisk.enable` is set to `true`, error and info logs will be written to their respective files.

```javascript
const logger = new Logger({
  writeToDisk: { enable: true, errorfilePath: 'logs/error.log', infoFilePath: 'logs/info.log' },
});
```

#### `Terminal Colorization`
If `enableTerminalColorizer` is set to `true`, logs will be styled with colors for better readability.

```javascript
const logger = new Logger({ enableTerminalColorizer: true });
```

### Example

Here is a complete example of how to use the logger:

```javascript
import Logger from '@falaksingh/logger';

const logger = new Logger({
  parseErrorInstance: true,
  enableLineSeparator: true,
  enableTerminalColorizer: true,
  writeToDisk: { enable: true, errorfilePath: 'logs/error.log', infoFilePath: 'logs/info.log' },
});

logger.error(new Error('This is an error message'));
logger.error('This is a plain text error message');
logger.info('This is an info message');
logger.success({ type: 'Fiat', model: '500', color: 'white' });
```

### Dependencies
This logger uses the `@falaksingh/sketch` package for styling the log messages.