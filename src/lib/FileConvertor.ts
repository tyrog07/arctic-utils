import * as fs from 'fs';
import axios from 'axios';

/**
 * A utility class for converting files, URLs, buffers, and streams to base64 and hexadecimal strings,
 * and vice-versa.
 */
export class FileConverter {
  /**
   * Converts a file, URL, Buffer, or ReadableStream to a base64 string.
   * @param source The source to convert. Can be a file path (string), URL (string), Buffer, or ReadableStream.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   */
  async fileToBase64(
    source: string | Buffer | ReadableStream,
  ): Promise<string | null> {
    try {
      if (typeof source === 'string') {
        if (this.isURL(source)) {
          return this.convertFromURL(source);
        } else {
          return this.convertFromFile(source);
        }
      } else if (source instanceof Buffer) {
        return this.convertFromBuffer(source);
      } else if (source instanceof ReadableStream) {
        return this.convertFromStream(source);
      } else {
        throw new Error(
          'Invalid source type. Provide a file path, URL, Buffer, or ReadableStream.',
        );
      }
    } catch (error) {
      console.error('Error converting to base64:', error);
      return null;
    }
  }

  /**
   * Writes a base64 string to a file.
   * @param base64String The base64 string to write.
   * @param outputPath The path to the output file.
   * @returns A Promise that resolves when the file is written successfully, or rejects if an error occurs.
   * @throws If an error occurs during file writing.
   */
  async base64ToFile(base64String: string, outputPath: string): Promise<void> {
    try {
      const buffer = Buffer.from(base64String, 'base64');
      await fs.promises.writeFile(outputPath, buffer);
    } catch (error) {
      console.error('Error writing base64 to file:', error);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Converts a file to a hexadecimal string.
   * @param filePath The path to the file.
   * @returns A Promise that resolves to the hexadecimal string, or null if an error occurs.
   */
  async fileToHex(filePath: string): Promise<string | null> {
    try {
      const data = await fs.promises.readFile(filePath);
      return data.toString('hex');
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  /**
   * Writes a hexadecimal string to a file.
   * @param hexString The hexadecimal string to write.
   * @param outputPath The path to the output file.
   * @returns A Promise that resolves when the file is written successfully, or rejects if an error occurs.
   * @throws If an error occurs during file writing.
   */
  async hexToFile(hexString: string, outputPath: string): Promise<void> {
    try {
      const buffer = Buffer.from(hexString, 'hex');
      await fs.promises.writeFile(outputPath, buffer);
    } catch (error) {
      console.error('Error writing hex to file:', error);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Checks if a string is a valid URL.
   * @param str The string to check.
   * @returns True if the string is a URL, false otherwise.
   * @private
   */
  private isURL(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Converts a file to a base64 string. (Helper function)
   * @param filePath The path to the file.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   * @private
   */
  private async convertFromFile(filePath: string): Promise<string | null> {
    try {
      const data = await fs.promises.readFile(filePath);
      return data.toString('base64');
    } catch (err) {
      console.error('Error reading file:', err);
      return null;
    }
  }

  /**
   * Converts a URL to a base64 string. (Helper function)
   * @param url The URL.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   * @private
   */
  private async convertFromURL(url: string): Promise<string | null> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      return buffer.toString('base64');
    } catch (error) {
      console.error('Error fetching URL:', error);
      return null;
    }
  }

  /**
   * Converts a Buffer to a base64 string. (Helper function)
   * @param buffer The Buffer.
   * @returns The base64 string.
   * @private
   */
  private convertFromBuffer(buffer: Buffer): string {
    return buffer.toString('base64');
  }

  /**
   * Converts a ReadableStream to a base64 string. (Helper function)
   * @param stream The ReadableStream.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   * @private
   */
  private async convertFromStream(
    stream: ReadableStream<Uint8Array>,
  ): Promise<string | null> {
    try {
      const reader = stream.getReader();
      let chunks: Uint8Array[] = [];
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (readerDone) {
          done = true;
        } else {
          chunks.push(value);
        }
      }
      const concatenatedLength = chunks.reduce(
        (acc, val) => acc + val.length,
        0,
      );
      const concatenated = new Uint8Array(concatenatedLength);
      let offset = 0;
      for (const chunk of chunks) {
        concatenated.set(chunk, offset);
        offset += chunk.length;
      }
      const buffer = Buffer.from(concatenated);
      return buffer.toString('base64');
    } catch (error) {
      console.error('Error reading stream:', error);
      return null;
    }
  }
}
