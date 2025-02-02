# Logger Utility
  
A simple and customizable logging utility for Node.js applications. This logger provides different methods for logging errors, info, and success messages with optional features like error trace and line separators.

## Installation

To use this logger in your project, you can install it via npm:

```bash
npm  install  @falaksingh/logger
```

### Usage:
Importing  the  `Logger`
First,  import  the  `Logger`  class  from  the  module
```javascript
import  Logger  from  '@falaksingh/logger';
```
Creating  a  Logger  Instance
You  can  create  an  instance  of  the  Logger  class  with  optional  configuration:
```javascript
const  logger  =  new  Logger({
enableErrorTrace:  true,
enableLineSeparator:  truea
});
```
#### Logging  Messages:

The  logger  provides  several  methods  for  logging  different  types  of  messages:

`Error  Logging`:  Logs  error  messages.  If  enableErrorTrace  is  set  to  true,  it  will  also  log  the  file  path  and  line  number  where  the  error  occurred.

```javascript
logger.error(new  Error('This is an error message'));
logger.error('This is a plain text error message');
```
`Info  Logging`:  Logs  informational  messages. 

```javascript
logger.info('This is an info message');
```
`Success  Logging`:  Logs  success  messages.

```javascript
logger.success({  type:  'Fiat',  model:  '500',  color:  'white'  });
```
### Configuration  Options
The  `Logger ` class  accepts  the  following  configuration  options:

`enableErrorTrace` (boolean): If set to true, the logger will include the file path and line number in error logs. Default is false.

`enableLineSeparator`(boolean): If set to true, the logger will add a line separator after each log message. Default is false.

Example

Here  is  a  complete  example  of  how  to  use  the  logger:
```javascript
import  Logger  from  '@falaksingh/logger';
const  logger  =  new  Logger({
enableErrorTrace:  true,
enableLineSeparator:  true
});
logger.error(new  Error('This is an error message'));
logger.error('This is a plain text error message');
logger.info('This is an info message');
logger.success({  type:  'Fiat',  model:  '500',  color:  'white'  });
```

Dependencies
This  logger  uses  the  `@falaksingh/sketch ` package  for  styling  the  log  messages.
