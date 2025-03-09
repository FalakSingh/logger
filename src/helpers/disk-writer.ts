import file from '../util/file-utils';

class DiskWriter {
  constructor(private errorFilePath: string, private infoFilePath: string) {}

  async write(message: string, type: 'error' | 'info' | 'success'): Promise<void> {
    const filePath = type === 'error' ? this.errorFilePath : this.infoFilePath;
    
    try {
      await file.append(filePath, `${message}\n`);
    } catch (err) {
      console.error(`Error writing ${type} log to disk: ${(err as Error).message}`);
    }
  }
}

export default DiskWriter;
