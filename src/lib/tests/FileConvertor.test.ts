import { FileConverter } from '../FileConvertor';

global.fetch = jest.fn(); // Mock fetch for URL testing

describe('FileConverter', () => {
  let converter: FileConverter;

  beforeEach(() => {
    converter = new FileConverter();
  });

  describe('fileToBase64', () => {
    it('should convert a File to base64', async () => {
      const file = new File(['Test content'], 'test-file.txt', {
        type: 'text/plain',
      });
      const base64 = await converter.fileToBase64(file);
      expect(base64).toBe('VGVzdCBjb250ZW50'); // Expected base64 of "Test content"
    });

    it('should convert a URL to base64', async () => {
      const url = 'https://example.com/image.jpg';
      const mockResponse = new Response(Buffer.from('Image data', 'binary'), {
        status: 200,
      });
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const base64 = await converter.fileToBase64(url);
      expect(base64).toBe('SW1hZ2UgZGF0YQ=='); // Expected base64 of "Image data"
    });

    it('should convert a Buffer to base64', async () => {
      const buffer = Buffer.from('Buffer content');
      const base64 = await converter.fileToBase64(buffer);
      expect(base64).toBe('QnVmZmVyIGNvbnRlbnQ='); // Expected base64 of "Buffer content"
    });

    it('should convert a ReadableStream to base64 (Manual Stream)', async () => {
      const text = 'Stream content';
      const encoded = new TextEncoder().encode(text);
      const chunks: Uint8Array[] = [];
      const chunkSize = 5; // Adjust chunk size as needed

      for (let i = 0; i < encoded.length; i += chunkSize) {
        chunks.push(
          encoded.subarray(i, Math.min(i + chunkSize, encoded.length)),
        ); // Corrected subarray slicing
      }

      const stream = new ReadableStream({
        pull(controller) {
          if (chunks.length > 0) {
            const chunk = chunks.shift();
            controller.enqueue(chunk);
          } else {
            controller.close();
          }
        },
      });

      const base64 = await converter.fileToBase64(stream);
      expect(base64).toBe(Buffer.from(text).toString('base64'));
    });

    it('should handle URL fetching errors', async () => {
      const url = 'https://example.com/error';
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));
      const base64 = await converter.fileToBase64(url);
      expect(base64).toBeNull();
    });

    it('should handle invalid source type', async () => {
      const invalidSource = 123 as any; // Force an invalid type
      const base64 = await converter.fileToBase64(invalidSource);
      expect(base64).toBeNull();
    });
  });

  describe('fileToHex', () => {
    it('should convert a File to hex', async () => {
      const file = new File(['Hex content'], 'test-file.txt', {
        type: 'text/plain',
      });
      const hex = await converter.fileToHex(file);
      expect(hex).toBe('48657820636f6e74656e74'); // Hex for "Hex content"
    });

    it('should convert a URL to hex', async () => {
      const url = 'https://example.com/image.jpg';
      const mockResponse = new Response(Buffer.from('Image data', 'binary'), {
        status: 200,
      });
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const hex = await converter.fileToHex(url);
      expect(hex).toBe('496d6167652064617461'); // Expected hex of "Image data"
    });

    it('should convert a Buffer to hex', async () => {
      const buffer = Buffer.from('Buffer content');
      const hex = await converter.fileToHex(buffer);
      expect(hex).toBe('42756666657220636f6e74656e74'); // Expected hex of "Buffer content"
    });

    it('should convert a ReadableStream to hex (Manual Stream)', async () => {
      const text = 'Stream content';
      const encoded = new TextEncoder().encode(text);
      const chunks: Uint8Array[] = [];
      const chunkSize = 5; // Adjust chunk size as needed

      for (let i = 0; i < encoded.length; i += chunkSize) {
        chunks.push(
          encoded.subarray(i, Math.min(i + chunkSize, encoded.length)),
        ); // Corrected subarray slicing
      }

      const stream = new ReadableStream({
        pull(controller) {
          if (chunks.length > 0) {
            const chunk = chunks.shift();
            controller.enqueue(chunk);
          } else {
            controller.close();
          }
        },
      });

      const hex = await converter.fileToHex(stream);
      expect(hex).toBe(Buffer.from(text).toString('hex'));
    });

    it('should handle URL fetching errors', async () => {
      const url = 'https://example.com/error';
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));
      const hex = await converter.fileToHex(url);
      expect(hex).toBeNull();
    });

    it('should handle invalid source type', async () => {
      const invalidSource = 123 as any; // Force an invalid type
      const hex = await converter.fileToHex(invalidSource);
      expect(hex).toBeNull();
    });
  });

  describe('base64ToFile', () => {
    it('should convert base64 to a File object in browser environment', async () => {
      jest.spyOn(converter as any, 'isBrowser').mockReturnValue(true); // Mock isBrowser to return true
      const base64 = 'SGVsbG8gV29ybGQh'; // Base64 for "Hello World!"
      const fileName = 'hello.txt';
      const file = await converter.base64ToFile(base64, fileName);
      if (file instanceof File) {
        expect(file.name).toBe(fileName);
        const text = await file.text();
        expect(text).toBe('Hello World!');
      } else {
        throw new Error('Expected a File object');
      }
    });

    it('should convert base64 to a Buffer in Node.js environment', async () => {
      jest.spyOn(converter as any, 'isBrowser').mockReturnValue(false); // Mock isBrowser to return false
      const base64 = 'SGVsbG8gV29ybGQh'; // Base64 for "Hello World!"
      const buffer = await converter.base64ToFile(base64);
      if (buffer instanceof Buffer) {
        expect(buffer.toString('utf-8')).toBe('Hello World!');
      } else {
        throw new Error('Expected a Buffer object');
      }
    });
  });

  describe('hexToFile', () => {
    it('should convert hex to a File object in browser environment', async () => {
      jest.spyOn(converter as any, 'isBrowser').mockReturnValue(true); // Mock isBrowser to return true
      const hex = '48657820636f6e74656e74'; // Hex for "Hex content"
      const fileName = 'hex.txt';
      const file = await converter.hexToFile(hex, fileName);
      if (file instanceof File) {
        expect(file.name).toBe(fileName);
        const text = await file.text();
        expect(text).toBe('Hex content');
      } else {
        throw new Error('Expected a File object');
      }
    });

    it('should convert hex to a Buffer in Node.js environment', async () => {
      jest.spyOn(converter as any, 'isBrowser').mockReturnValue(false); // Mock isBrowser to return false
      const hex = '48657820636f6e74656e74'; // Hex for "Hex content"
      const buffer = await converter.hexToFile(hex);
      if (buffer instanceof Buffer) {
        expect(buffer.toString('utf-8')).toBe('Hex content');
      } else {
        throw new Error('Expected a Buffer object');
      }
    });
  });
});
