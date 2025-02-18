import { FileConverter } from './../FileConvertor';
import * as fs from 'fs';

global.fetch = jest.fn(); // Mock fetch for URL testing

describe('FileConverter', () => {
  let converter: FileConverter;

  beforeEach(() => {
    converter = new FileConverter();
  });

  describe('fileToBase64', () => {
    it('should convert a file to base64', async () => {
      const filePath = './test-file.txt'; // Create a test file
      fs.writeFileSync(filePath, 'Test content');
      const base64 = await converter.fileToBase64(filePath);
      expect(base64).toBe('VGVzdCBjb250ZW50'); // Expected base64 of "Test content"
      fs.unlinkSync(filePath); // Clean up the test file
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

    it('should handle file reading errors', async () => {
      const filePath = './nonexistent-file.txt';
      const base64 = await converter.fileToBase64(filePath);
      expect(base64).toBeNull();
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

  describe('base64ToFile', () => {
    it('should write base64 to a file', async () => {
      const base64 = 'SGVsbG8gV29ybGQh'; // Base64 for "Hello World!"
      const outputPath = './output.txt';

      await converter.base64ToFile(base64, outputPath);
      const fileContent = fs.readFileSync(outputPath, 'utf-8');
      expect(fileContent).toBe('Hello World!');
      fs.unlinkSync(outputPath); // Clean up
    });

    it('should handle file writing errors', async () => {
      const base64 = 'SGVsbG8gV29ybGQh';
      const outputPath = './nonexistent-directory/output.txt'; // Invalid path

      await expect(
        converter.base64ToFile(base64, outputPath),
      ).rejects.toThrow();
    });
  });

  describe('fileToHex', () => {
    it('should convert a file to hex', async () => {
      const filePath = './test-file.txt';
      fs.writeFileSync(filePath, 'Hex content');
      const hex = await converter.fileToHex(filePath);
      expect(hex).toBe('48657820636f6e74656e74'); // Hex for "Hex content"
      fs.unlinkSync(filePath);
    });

    it('should handle file reading errors', async () => {
      const filePath = './nonexistent-file.txt';
      const hex = await converter.fileToHex(filePath);
      expect(hex).toBeNull();
    });
  });

  describe('hexToFile', () => {
    it('should write hex to a file', async () => {
      const hex = '48657820636f6e74656e74'; // Hex for "Hex content"
      const outputPath = './output-hex.txt';

      await converter.hexToFile(hex, outputPath);
      const fileContent = fs.readFileSync(outputPath); // Read as binary
      expect(fileContent.toString('utf-8')).toBe('Hex content'); // Check content
      fs.unlinkSync(outputPath);
    });

    it('should handle file writing errors', async () => {
      const hex = '48657820636f6e74656e74';
      const outputPath = './nonexistent-directory/output-hex.txt';

      await expect(converter.hexToFile(hex, outputPath)).rejects.toThrow();
    });
  });
});
