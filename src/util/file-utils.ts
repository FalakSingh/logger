import * as fs from 'fs';
import * as path from 'path';

/**
 * Ensures that the directory for the given file path exists.
 * If not, it creates the directory recursively.
 */
async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
}

/**
 * Creates a new file with the given content.
 * If the file already exists, it will be overwritten.
 */
async function createFile(filePath: string, content: string = ''): Promise<void> {
  try {
    await ensureDirectoryExists(filePath);
    await fs.promises.writeFile(filePath, content, 'utf8');
    console.log(`File created successfully at: ${filePath}`);
  } catch (err) {
    console.error(`Error creating file: ${(err as Error).message}`);
    throw err; // Re-throw the error for the caller to handle
  }
}

/**
 * Appends content to an existing file.
 * If the file does not exist, it will be created.
 */
async function appendToFile(filePath: string, content: string = ''): Promise<void> {
  try {
    await ensureDirectoryExists(filePath);
    await fs.promises.appendFile(filePath, content, 'utf8');
    // console.log(`Content appended successfully to: ${filePath}`);
  } catch (err) {
    console.error(`Error appending to file: ${(err as Error).message}`);
    throw err; // Re-throw the error for the caller to handle
  }
}

/**
 * Checks if a file exists at the given path.
 */
function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Reads the content of a file.
 */
async function readFile(filePath: string): Promise<string> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return content;
  } catch (err) {
    console.error(`Error reading file: ${(err as Error).message}`);
    throw err; // Re-throw the error for the caller to handle
  }
}

const file = {
  create: createFile,
  append: appendToFile,
  exists: fileExists,
  read: readFile,
};

export default file;
