export type TConfig = {
  writeToDisk?: boolean;
  absolutePathForLogs?: string;
  enableErrorTrace?: boolean;
  enableLineSeparator?: boolean;
};

export type TPayload = string | object | Error;
