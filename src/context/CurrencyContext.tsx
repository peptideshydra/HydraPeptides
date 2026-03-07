import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type CurrencyCode = 'USD' | 'EUR' | 'AUD'

interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  rate: number
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.55 },
}

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  symbol: string
  /** Convert a USD amount and return formatted string like "$129.99" */
  fmt: (usdAmount: number) => string
  /** Convert a USD amount and return just the number */
  convert: (usdAmount: number) => number
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'USD',
  setCurrency: () => {},
  symbol: '$',
  fmt: (n) => `$${n.toFixed(2)}`,
  convert: (n) => n,
})

const STORAGE_KEY = 'hp_currency'

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null
      if (saved && CURRENCIES[saved]) return saved
    } catch { /* noop */ }
    return 'USD'
  })

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c)
    try { localStorage.setItem(STORAGE_KEY, c) } catch { /* noop */ }
  }, [])

  const info = CURRENCIES[currency]

  const convert = useCallback(
    (usdAmount: number) => +(usdAmount * info.rate).toFixed(2),
    [info.rate],
  )

  const fmt = useCallback(
    (usdAmount: number) => {
      const converted = usdAmount * info.rate
      return `${info.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    [info.rate, info.symbol],
  )

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol: info.symbol, fmt, convert }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
