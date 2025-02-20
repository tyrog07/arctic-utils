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
});
