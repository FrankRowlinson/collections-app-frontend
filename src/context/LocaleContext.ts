import { createContext } from 'react'

interface LocaleContextInterface {
  locale: string
  localeMode?: {
    changeLocale: (name: string) => void
  }
}

export const LocaleContext = createContext<LocaleContextInterface>({locale: localStorage.getItem('locale') || 'en'})
