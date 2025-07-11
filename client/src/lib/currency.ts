import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  pricing: Record<string, number>;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const SUPPORTED_CURRENCIES = ['DKK', 'SEK', 'NOK', 'EUR'];
const CURRENCY_SYMBOLS = {
  DKK: 'kr',
  SEK: 'kr',
  NOK: 'kr',
  EUR: '€'
};

export function CurrencyProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [currency, setCurrency] = useState('DKK');
  const [pricing, setPricing] = useState<Record<string, number>>({
    free: 0,
    single: 129,
    multiple: 249
  });

  useEffect(() => {
    // Detect user's location and set appropriate currency
    const detectCurrency = () => {
      const locale = navigator.language.toLowerCase();
      if (locale.includes('sv') || locale.includes('se')) return 'SEK';
      if (locale.includes('no') || locale.includes('nb')) return 'NOK';
      if (locale.includes('fi') || locale.includes('de')) return 'EUR';
      return 'DKK';
    };

    const detectedCurrency = detectCurrency();
    setCurrency(detectedCurrency);
    fetchPricing(detectedCurrency);
  }, []);

  const fetchPricing = async (curr: string) => {
    try {
      const response = await fetch(`/api/pricing/${curr}`);
      if (response.ok) {
        const data = await response.json();
        setPricing(data.pricing);
      }
    } catch (error) {
      console.error("Failed to fetch pricing:", error);
    }
  };

  const handleSetCurrency = (newCurrency: string) => {
    if (SUPPORTED_CURRENCIES.includes(newCurrency)) {
      setCurrency(newCurrency);
      fetchPricing(newCurrency);
    }
  };

  const formatPrice = (amount: number): string => {
    const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS];
    
    if (currency === 'EUR') {
      return `${symbol}${amount}`;
    } else {
      return `${amount} ${symbol}`;
    }
  };

  return React.createElement(
    CurrencyContext.Provider,
    {
      value: {
        currency,
        setCurrency: handleSetCurrency,
        pricing,
        formatPrice
      }
    },
    children
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
