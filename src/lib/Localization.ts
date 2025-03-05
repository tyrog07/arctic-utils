/**
 * The Localization class provides methods to handle locale-specific formatting for numbers and dates.
 */

import {
  PhoneNumberFormat,
  PhoneNumberHandler,
} from '@arctics/google-phonelib';

export class Localization {
  /**
   * The current locale code.
   * @type {string}
   * @private
   * @default 'en-US'
   */
  private static currentLocale: string = 'en-US'; // Default locale

  /**
   * Sets the current locale to the provided locale code.
   * @param {string} localeCode - The locale code to set.
   */
  public static setLocale(localeCode: string): void {
    try {
      if (Intl.NumberFormat.supportedLocalesOf([localeCode]).length > 0) {
        Localization.currentLocale = localeCode;
      } else {
        throw new Error(`Locale '${localeCode}' is not supported.`);
      }
    } catch (e: any) {
      throw new Error(`An error occurred: ${e.message}`);
    }
  }

  /**
   * Returns the current locale code.
   * @returns {string} The current locale code.
   */
  public static getLocale(): string {
    return Localization.currentLocale;
  }

  /**
   * Formats a number according to the current locale.
   * @param {number} number - The number to format.
   * @returns {string} The formatted number.
   */
  public static formatNumber(number: number): string {
    const locale = Localization.currentLocale;

    try {
      const numberFormat = new Intl.NumberFormat(locale, {
        style: 'decimal',
      });
      return numberFormat.format(number);
    } catch (error) {
      console.error('Error formatting number:', error);
      return number.toString(); // Fallback
    }
  }

  /**
   * Formats a number as currency according to the current locale.
   * @param {number} number - The number to format.
   * @param {string} [currencyCode] - The currency code to use for formatting. Defaults to 'USD' if not provided.
   * @returns {string} The formatted currency.
   */
  public static formatCurrency(
    number: number,
    currencyCode: string = 'USD',
  ): string {
    const locale = Localization.currentLocale;

    try {
      const numberFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      });
      return numberFormat.format(number);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return number.toString(); // Fallback
    }
  }

  /**
   * Formats a date according to the current locale.
   * @param {Date | string} date - The date to format, either as a Date object or a string.
   * @param {Intl.DateTimeFormatOptions} [options] - Options for date formatting as per Intl.DateTimeFormatOptions.
   * @returns {string} The formatted date.
   */
  public static formatDate(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    const locale = Localization.currentLocale;
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    try {
      const dateFormat = new Intl.DateTimeFormat(
        locale,
        options || { dateStyle: 'medium' },
      );
      return dateFormat.format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateObj.toLocaleDateString(); // Fallback
    }
  }

  /**
   * Formats a phone number according to the specified region or the current locale.
   * @param {string} phoneNumber - The phone number to format.
   * @returns {string} The formatted phone number, or the original number if formatting fails.
   */
  public static formatPhoneNumber(phoneNumber: string): string {
    try {
      const locale = Localization.currentLocale;
      const defaultRegion = locale.split('-')[1].toUpperCase(); // Extract region from locale

      const parsedNumber = new PhoneNumberHandler(phoneNumber, defaultRegion);
      const info = parsedNumber.getPhoneNumberInfo();
      if (info.valid) {
        return parsedNumber.format(PhoneNumberFormat.NATIONAL);
      } else {
        console.warn(
          `Invalid phone number: ${phoneNumber} for region: ${defaultRegion}`,
        );
        return phoneNumber; // Return original number if invalid
      }
    } catch (error) {
      console.error('Error formatting phone number:', error);
      return phoneNumber; // Fallback to original number
    }
  }

  // ... other localization functions as needed (e.g., for relative time formatting)
}
