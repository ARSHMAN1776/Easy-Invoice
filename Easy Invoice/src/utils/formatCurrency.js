import { WORLD_CURRENCIES } from './currencies';

export const formatCurrency = (amount, currencyCode = 'USD', minimumFractionDigits = 2) => {
  // Use appropriate locale for different currency regions
  const getLocale = (currency) => {
    const localeMap = {
      'USD': 'en-US', 'EUR': 'de-DE', 'GBP': 'en-GB', 'JPY': 'ja-JP',
      'AUD': 'en-AU', 'CAD': 'en-CA', 'CHF': 'de-CH', 'CNY': 'zh-CN',
      'SEK': 'sv-SE', 'NZD': 'en-NZ', 'SGD': 'en-SG', 'HKD': 'zh-HK',
      'NOK': 'nb-NO', 'KRW': 'ko-KR', 'BRL': 'pt-BR',
      'ZAR': 'en-ZA', 'DKK': 'da-DK', 'PLN': 'pl-PL', 'THB': 'th-TH',
      'MXN': 'es-MX', 'TRY': 'tr-TR', 'RUB': 'ru-RU'
    };
    return localeMap[currency] || 'en-US';
  };
  
  const locale = getLocale(currencyCode);
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency: currencyCode, 
    minimumFractionDigits 
  }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  // Prefer explicit symbol from WORLD_CURRENCIES list; fallback to Intl formatting
  const entry = WORLD_CURRENCIES.find((c) => c.code === currencyCode);
  if (entry && entry.symbol) return entry.symbol;
  try {
    return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
  } catch (e) {
    return currencyCode;
  }
};
