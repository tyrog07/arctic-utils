# @arctics/utils (beta)

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tyrog07/@arctics/utils/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@arctics/utils/latest.svg)](https://www.npmjs.com/package/@arctics/utils)
[![npm downloads](https://img.shields.io/npm/dm/@arctics/utils.svg)](https://www.npmjs.com/package/@arctics/utils)
[![Checks](https://github.com/tyrog07/arctics-utils/actions/workflows/test.yml/badge.svg)](https://github.com/tyrog07/arctics-utils/actions/workflows/test.yml)
[![Build](https://github.com/tyrog07/arctics-utils/actions/workflows/build.yml/badge.svg)](https://github.com/tyrog07/arctics-utils/actions/workflows/build.yml)
[![CI](https://github.com/tyrog07/arctics-utils/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/tyrog07/arctics-utils/actions/workflows/CI.yml)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@arctics/utils&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@arctics/utils)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@arctics/utils?style=flat-square)](https://bundlephobia.com/package/@arctics/utils@latest)
[![Known Vulnerabilities](https://snyk.io/test/npm/@arctics/utils/badge.svg)](https://snyk.io/test/npm/@arctics/utils)

</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

A JavaScript/TypeScript package providing utilities around certain functionalities.

## Installation

```bash
npm install @arctics/utils
```

or

```bash
yarn add @arctics/utils
```

## Usage

### FileConvertor

```typescript
import { FileConverter } from '@arctics/utils';

// Create an instance of FileConverter
const fileConverter = new FileConverter();

// Convert a file to base64
fileConverter.fileToBase64('path/to/file.txt').then((base64String) => {
  console.log('Base64:', base64String);
});

// Convert a URL to base64
fileConverter
  .fileToBase64('https://example.com/image.png')
  .then((base64String) => {
    console.log('Base64:', base64String);
  });

// Convert a base64 string to a file
fileConverter.base64ToFile('base64String', 'path/to/output.txt').then(() => {
  console.log('File written successfully');
});

// Convert a file to hexadecimal
fileConverter.fileToHex('path/to/file.txt').then((hexString) => {
  console.log('Hexadecimal:', hexString);
});

// Convert a hexadecimal string to a file
fileConverter.hexToFile('hexString', 'path/to/output.txt').then(() => {
  console.log('File written successfully');
});
```

## API

### FileConvertor

#### Methods

- **fileToBase64(source: string | Buffer | ReadableStream): Promise<string | null>**

  Converts a file, URL, Buffer, or ReadableStream to a base64 string.

  - `source`: The source to convert. Can be a file path (string), URL (string), Buffer, or ReadableStream.
  - Returns: A Promise that resolves to the base64 string, or null if an error occurs.

- **base64ToFile(base64String: string, outputPath: string): Promise<void>**

  Writes a base64 string to a file.

  - `base64String`: The base64 string to write.
  - `outputPath`: The path to the output file.
  - Returns: A Promise that resolves when the file is written successfully, or rejects if an error occurs.

- **fileToHex(filePath: string): Promise<string | null>**

  Converts a file to a hexadecimal string.

  - `filePath`: The path to the file.
  - Returns: A Promise that resolves to the hexadecimal string, or null if an error occurs.

- **hexToFile(hexString: string, outputPath: string): Promise<void>**

  Writes a hexadecimal string to a file.

  - `hexString`: The hexadecimal string to write.
  - `outputPath`: The path to the output file.
  - Returns: A Promise that resolves when the file is written successfully, or rejects if an error occurs.

#### Private Methods

- **isURL(str: string): boolean**

  Checks if a string is a valid URL.

  - `str`: The string to check.
  - Returns: True if the string is a URL, false otherwise.

- **convertFromFile(filePath: string): Promise<string | null>**

  Converts a file to a base64 string.

  - `filePath`: The path to the file.
  - Returns: A Promise that resolves to the base64 string, or null if an error occurs.

- **convertFromURL(url: string): Promise<string | null>**

  Converts a URL to a base64 string.

  - `url`: The URL.
  - Returns: A Promise that resolves to the base64 string, or null if an error occurs.

- **convertFromBuffer(buffer: Buffer): string**

  Converts a Buffer to a base64 string.

  - `buffer`: The Buffer.
  - Returns: The base64 string.

- **convertFromStream(stream: ReadableStream<Uint8Array>): Promise<string | null>**

  Converts a ReadableStream to a base64 string.

  - `stream`: The ReadableStream.
  - Returns: A Promise that resolves to the base64 string, or null if an error occurs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/tyrog07/arctics-utils/blob/HEAD/LICENSE).
