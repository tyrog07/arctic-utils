/**
 * A utility class for converting files, URLs, buffers, and streams to base64 and hexadecimal strings,
 * and vice-versa.
 */
export class FileConverter {
  /**
   * Converts a file, URL, Buffer, or ReadableStream to a base64 string.
   * @param source The source to convert. Can be a File, Blob, URL (string), Buffer, or ReadableStream.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   */
  async fileToBase64(
    source: File | Blob | string | Buffer | ReadableStream,
  ): Promise<string | null> {
    try {
      if (typeof source === 'string') {
        if (this.isURL(source)) {
          return this.convertFromURL(source);
        } else {
          throw new Error(
            'Invalid source type. Provide a URL, Buffer, or ReadableStream.',
          );
        }
      } else if (source instanceof File || source instanceof Blob) {
        return this.convertFromFile(source);
      } else if (source instanceof Buffer) {
        return this.convertFromBuffer(source);
      } else if (source instanceof ReadableStream) {
        return this.convertFromStream(source);
      } else {
        throw new Error(
          'Invalid source type. Provide a File, Blob, URL, Buffer, or ReadableStream.',
        );
      }
    } catch (error) {
      console.error('Error converting to base64:', error);
      return null;
    }
  }

  /**
   * Converts a file, URL, Buffer, or ReadableStream to a hexadecimal string.
   * @param source The source to convert. Can be a File, Blob, URL (string), Buffer, or ReadableStream.
   * @returns A Promise that resolves to the hexadecimal string, or null if an error occurs.
   */
  async fileToHex(
    source: File | Blob | string | Buffer | ReadableStream,
  ): Promise<string | null> {
    try {
      if (typeof source === 'string') {
        if (this.isURL(source)) {
          return this.convertFromURLToHex(source);
        } else {
          throw new Error(
            'Invalid source type. Provide a URL, Buffer, or ReadableStream.',
          );
        }
      } else if (source instanceof File || source instanceof Blob) {
        return this.convertFromFileToHex(source);
      } else if (source instanceof Buffer) {
        return this.convertFromBufferToHex(source);
      } else if (source instanceof ReadableStream) {
        return this.convertFromStreamToHex(source);
      } else {
        throw new Error(
          'Invalid source type. Provide a File, Blob, URL, Buffer, or ReadableStream.',
        );
      }
    } catch (error) {
      console.error('Error converting to hex:', error);
      return null;
    }
  }

  /**
   * Converts a base64 string to a File object or Buffer.
   * @param base64String The base64 string to convert.
   * @param fileName The name of the file (required in browser environment).
   * @returns A Promise that resolves to the File object (in browser) or Buffer (in Node.js), or rejects if an error occurs.
   * @throws If an error occurs during conversion.
   */
  async base64ToFile(
    base64String: string,
    fileName?: string,
  ): Promise<File | Buffer> {
    try {
      const buffer = this.isBrowser()
        ? this.base64ToArrayBuffer(base64String)
        : Buffer.from(base64String, 'base64');
      if (this.isBrowser()) {
        if (!fileName) {
          throw new Error('fileName is required in browser environment');
        }
        // Browser environment
        const blob = new Blob([buffer]);
        const file = new File([blob], fileName);
        return file;
      } else {
        // Node.js environment
        return Buffer.from(buffer);
      }
    } catch (error) {
      console.error('Error converting base64 to File:', error);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Converts a hexadecimal string to a File object or Buffer.
   * @param hexString The hexadecimal string to convert.
   * @param fileName The name of the file (required in browser environment).
   * @returns A Promise that resolves to the File object (in browser) or Buffer (in Node.js), or rejects if an error occurs.
   * @throws If an error occurs during conversion.
   */
  async hexToFile(
    hexString: string,
    fileName?: string,
  ): Promise<File | Buffer> {
    try {
      const buffer = this.isBrowser()
        ? this.hexToArrayBuffer(hexString)
        : Buffer.from(hexString, 'hex');
      if (this.isBrowser()) {
        if (!fileName) {
          throw new Error('fileName is required in browser environment');
        }
        // Browser environment
        const blob = new Blob([buffer]);
        const file = new File([blob], fileName);
        return file;
      } else {
        // Node.js environment
        return Buffer.from(buffer);
      }
    } catch (error) {
      console.error('Error converting hex to File:', error);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Checks if the current environment is a browser.
   * @returns True if the current environment is a browser, false otherwise.
   * @private
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
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
   * Converts a File or Blob to a base64 string. (Helper function)
   * @param file The File or Blob.
   * @returns A Promise that resolves to the base64 string, or null if an error occurs.
   * @private
   */
  private async convertFromFile(file: File | Blob): Promise<string | null> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = this.isBrowser()
        ? this.arrayBufferToBase64(arrayBuffer)
        : Buffer.from(arrayBuffer).toString('base64');
      return buffer;
    } catch (err) {
      console.error('Error reading file:', err);
      return null;
    }
  }

  /**
   * Converts a File or Blob to a hexadecimal string. (Helper function)
   * @param file The File or Blob.
   * @returns A Promise that resolves to the hexadecimal string, or null if an error occurs.
   * @private
   */
  private async convertFromFileToHex(
    file: File | Blob,
  ): Promise<string | null> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = this.isBrowser()
        ? this.arrayBufferToHex(arrayBuffer)
        : Buffer.from(arrayBuffer).toString('hex');
      return buffer;
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
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      return this.isBrowser()
        ? this.arrayBufferToBase64(buffer)
        : Buffer.from(buffer).toString('base64');
    } catch (error) {
      console.error('Error fetching URL:', error);
      return null;
    }
  }

  /**
   * Converts a URL to a hexadecimal string. (Helper function)
   * @param url The URL.
   * @returns A Promise that resolves to the hexadecimal string, or null if an error occurs.
   * @private
   */
  private async convertFromURLToHex(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      return this.isBrowser()
        ? this.arrayBufferToHex(buffer)
        : Buffer.from(buffer).toString('hex');
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
   * Converts a Buffer to a hexadecimal string. (Helper function)
   * @param buffer The Buffer.
   * @returns The hexadecimal string.
   * @private
   */
  private convertFromBufferToHex(buffer: Buffer): string {
    return buffer.toString('hex');
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
      const buffer = this.isBrowser()
        ? this.arrayBufferToBase64(concatenated.buffer)
        : Buffer.from(concatenated).toString('base64');
      return buffer;
    } catch (error) {
      console.error('Error reading stream:', error);
      return null;
    }
  }

  /**
   * Converts a ReadableStream to a hexadecimal string. (Helper function)
   * @param stream The ReadableStream.
   * @returns A Promise that resolves to the hexadecimal string, or null if an error occurs.
   * @private
   */
  private async convertFromStreamToHex(
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
      const buffer = this.isBrowser()
        ? this.arrayBufferToHex(concatenated.buffer)
        : Buffer.from(concatenated).toString('hex');
      return buffer;
    } catch (error) {
      console.error('Error reading stream:', error);
      return null;
    }
  }

  /**
   * Converts an ArrayBuffer to a base64 string.
   * @param arrayBuffer The ArrayBuffer to convert.
   * @returns The base64 string.
   * @private
   */
  private arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    const binary = String.fromCharCode(...new Uint8Array(arrayBuffer));
    return btoa(binary);
  }

  /**
   * Converts a base64 string to an ArrayBuffer.
   * @param base64 The base64 string to convert.
   * @returns The ArrayBuffer.
   * @private
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const arrayBuffer = new ArrayBuffer(binary.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }
    return arrayBuffer;
  }

  /**
   * Converts an ArrayBuffer to a hexadecimal string.
   * @param arrayBuffer The ArrayBuffer to convert.
   * @returns The hexadecimal string.
   * @private
   */
  private arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(arrayBuffer);
    return Array.from(uint8Array)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Converts a hexadecimal string to an ArrayBuffer.
   * @param hex The hexadecimal string to convert.
   * @returns The ArrayBuffer.
   * @private
   */
  private hexToArrayBuffer(hex: string): ArrayBuffer {
    const arrayBuffer = new ArrayBuffer(hex.length / 2);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < hex.length; i += 2) {
      uint8Array[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return arrayBuffer;
  }
}
