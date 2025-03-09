export type TConfig = {
  writeToDisk?: { enable: boolean; errorfilePath?: string; infoFilePath?: string };
  absolutePathForLogs?: string;
  parseErrorInstance?: boolean;
  enableLineSeparator?: boolean;
  enableTerminalColorizer?: boolean;
};

export type TPayload = string | object | Error;
