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
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Locales List](#locales-list)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

A JavaScript/TypeScript package providing utilities around certain functionalities.

## Features

- **FileConvertor**: Convert files to and from base64 and hexadecimal formats.
- **Localization**: Handle locale-specific formatting for numbers, currencies, and dates.

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

### Localization

```typescript
import { Localization } from '@arctics/utils';

// Set the locale to French (France)
Localization.setLocale('fr-FR');

// Get the current locale
console.log(Localization.getLocale()); // Output: 'fr-FR'

// Format a number according to the current locale
console.log(Localization.formatNumber(1234567.89)); // Output: '1 234 567,89'

// Format a number as currency according to the current locale
console.log(Localization.formatCurrency(1234567.89, 'EUR')); // Output: '1 234 567,89 €'

// Format a date according to the current locale
console.log(Localization.formatDate(new Date())); // Output: '19 févr. 2025'
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

### Localization

#### Methods

- **setLocale(localeCode: string): void**

  Sets the current locale to the provided locale code.

  - localeCode: The locale code to set.

- **getLocale(): string**

  Returns the current locale code.

  - Returns: The current locale code.

- **formatNumber(number: number): string**

  Formats a number according to the current locale.

  - number: The number to format.
  - Returns: The formatted number.

- **formatCurrency(number: number, currencyCode: string = 'USD'): string**

  Formats a number as currency according to the current locale.

  - number: The number to format.
  - currencyCode: The currency code to use for formatting. Defaults to 'USD' if not provided.
  - Returns: The formatted currency.

- **formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string**

  Formats a date according to the current locale.

  - date: The date to format, either as a Date object or a string.
  - options: Options for date formatting as per Intl.DateTimeFormatOptions.
  - Returns: The formatted date.

## Locales List

For a detailed list of supported locales, please refer to the [Locales List](SUPPORTED_LOCALES.md) file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/tyrog07/arctics-utils/blob/HEAD/LICENSE).
