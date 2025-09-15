// Major world currencies
export const WORLD_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
];

export const getCurrencyInfo = (currencyCode) => {
  return WORLD_CURRENCIES.find(currency => currency.code === currencyCode) || 
         { code: currencyCode, name: currencyCode, symbol: currencyCode };
};