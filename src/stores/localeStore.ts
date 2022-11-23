import { makeAutoObservable } from 'mobx'
import { i18n } from '@lingui/core'
import moment from 'moment'
import { en, pl } from 'make-plural/plurals'
// @ts-ignore
import localization from 'moment/locale/pl'
import { plMessages, enMessages } from '../locales'

class LocaleState {
  locale: string = localStorage.getItem('locale') || 'en'

  changeLocale(locale: string): void {
    this.locale = locale
    localStorage.setItem('locale', locale)
    i18n.activate(locale)
    moment.updateLocale(locale, localization)
  }

  initializeLocale(): void {
    i18n.loadLocaleData({
      en: { plurals: en },
      pl: { plurals: pl },
    })
    i18n.load('en', enMessages)
    i18n.load('pl', plMessages)
    i18n.activate(this.locale)
    moment.updateLocale(this.locale, localization)
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const localeStore = new LocaleState()
