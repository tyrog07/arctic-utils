import { Localization } from '../Localization';

describe('Localization', () => {
  beforeEach(() => {
    // Reset locale to default before each test
    Localization.setLocale('en-US');
  });

  describe('setLocale and getLocale', () => {
    it('should set and get the current locale', () => {
      Localization.setLocale('FR');
      expect(Localization.getLocale()).toBe('FR');
    });

    it('should throw an error for unsupported locale', () => {
      expect(() => Localization.setLocale('invalid-locale')).toThrow(
        "An error occurred: Locale 'invalid-locale' is not supported.",
      );
    });

    it('should set locale to a valid locale code', () => {
      Localization.setLocale('es-ES');
      expect(Localization.getLocale()).toBe('es-ES');
    });
  });

  describe('formatNumber', () => {
    it('should format number in US locale', () => {
      Localization.setLocale('en-US');
      expect(Localization.formatNumber(1234.56)).toBe('1,234.56');
    });

    it('should format number in French locale', () => {
      Localization.setLocale('FR');
      expect(Localization.formatNumber(1234.56)).toBe('1 234,56');
    });

    it('should format number in Japanese locale', () => {
      Localization.setLocale('ja-JP');
      expect(Localization.formatNumber(1234.56)).toBe('1,234.56');
    });

    it('should format number in German locale', () => {
      Localization.setLocale('DE');
      expect(Localization.formatNumber(1234.56)).toBe('1.234,56');
    });

    it('should format number in Indian locale', () => {
      Localization.setLocale('en-IN');
      expect(Localization.formatNumber(1234.56)).toBe('1,234.56');
    });
  });

  describe('formatCurrency', () => {
    it('should format number as currency in US locale', () => {
      Localization.setLocale('en-US');
      expect(Localization.formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('should format number as currency in French locale', () => {
      Localization.setLocale('FR');
      expect(Localization.formatCurrency(1234.56, 'EUR')).toBe('1 234,56 €');
    });

    it('should format number as currency in Japanese locale', () => {
      Localization.setLocale('ja-JP');
      expect(Localization.formatCurrency(1234.56, 'JPY')).toBe('￥1,235');
    });

    it('should format number as currency in German locale', () => {
      Localization.setLocale('DE');
      expect(Localization.formatCurrency(1234.56, 'EUR')).toBe('1.234,56 €');
    });

    it('should format number as currency in Indian locale', () => {
      Localization.setLocale('en-IN');
      expect(Localization.formatCurrency(1234.56, 'INR')).toBe('₹1,234.56');
    });
  });

  describe('formatDate', () => {
    it('should format date in US locale', () => {
      Localization.setLocale('en-US');
      const date = new Date('2025-02-19');
      expect(Localization.formatDate(date)).toBe('Feb 19, 2025');
    });

    it('should format date in French locale', () => {
      Localization.setLocale('FR');
      const date = new Date('2025-02-19');
      expect(Localization.formatDate(date)).toBe('19 févr. 2025');
    });

    it('should format date in Japanese locale', () => {
      Localization.setLocale('ja-JP');
      const date = new Date('2025-02-19');
      expect(Localization.formatDate(date)).toBe('2025/02/19');
    });

    it('should format date in German locale', () => {
      Localization.setLocale('DE');
      const date = new Date('2025-02-19');
      expect(Localization.formatDate(date)).toBe('19.02.2025');
    });

    it('should format date in Indian locale', () => {
      Localization.setLocale('en-IN');
      const date = new Date('2025-02-19');
      expect(Localization.formatDate(date)).toBe('19 Feb 2025');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format a valid US phone number', () => {
      Localization.setLocale('en-US');
      const formatted = Localization.formatPhoneNumber('2125551212');
      expect(formatted).toBe('(212) 555-1212');
    });

    it('should format a valid UK phone number', () => {
      Localization.setLocale('en-GB');
      const formatted = Localization.formatPhoneNumber('02071838750');
      expect(formatted).toBe('020 7183 8750');
    });

    it('should format a valid German phone number', () => {
      Localization.setLocale('de-DE');
      const formatted = Localization.formatPhoneNumber('03012345678');
      expect(formatted).toBe('030 12345678');
    });

    it('should return the original number for an invalid US phone number', () => {
      Localization.setLocale('en-US');
      const invalidNumber = '123';
      const formatted = Localization.formatPhoneNumber(invalidNumber);
      expect(formatted).toBe(invalidNumber);
    });

    it('should return the original number for an invalid UK phone number', () => {
      Localization.setLocale('en-GB');
      const invalidNumber = '123';
      const formatted = Localization.formatPhoneNumber(invalidNumber);
      expect(formatted).toBe(invalidNumber);
    });

    it('should return the original number for an invalid German phone number', () => {
      Localization.setLocale('de-DE');
      const invalidNumber = '123';
      const formatted = Localization.formatPhoneNumber(invalidNumber);
      expect(formatted).toBe(invalidNumber);
    });

    it('should handle edge cases with unusual but valid numbers', () => {
      Localization.setLocale('en-US');
      const formatted = Localization.formatPhoneNumber('1800FLOWERS');
      expect(formatted).toBe('(800) 356-9377');
    });

    it('should handle edge cases with unusual but valid numbers in other regions', () => {
      Localization.setLocale('en-GB');
      const formatted = Localization.formatPhoneNumber('0800 1111');
      expect(formatted).toBe('0800 1111');
    });

    it('should log a warning for invalid phone numbers', () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      Localization.setLocale('en-US');
      Localization.formatPhoneNumber('123');
      expect(consoleWarnSpy).toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });

    it('should use the locale to determine the region', () => {
      Localization.setLocale('fr-FR');
      const formatted = Localization.formatPhoneNumber('01 23 45 67 89');
      expect(formatted).toBe('01 23 45 67 89');
    });
  });
});
