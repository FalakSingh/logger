import path from 'path';

const extractErrorMetaData = (error: Error): { path: string; name: string; line: string } => {
  const match = error.stack?.split('\n')[1].match(/\((.*):(\d+):\d+\)/); // Extracts file path and line number

  const filePath = match?.[1] || 'Unable to extract file path';
  const lineNumber = match?.[2] || 'Unknown';

  return {
    path: filePath,
    name: path.basename(filePath),
    line: lineNumber,
  };
};

const errorMethods = { extractErrorMetaData };

export default errorMethods;
