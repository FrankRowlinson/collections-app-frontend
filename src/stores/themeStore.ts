import { createTheme, PaletteMode } from '@mui/material'
import { makeAutoObservable } from 'mobx'
import { getDesignTokens } from '../themes'

class ThemeState {
  mode: PaletteMode = (localStorage.getItem('theme') as PaletteMode) || 'light'
  theme = createTheme(getDesignTokens(this.mode))

  toggleColorMode = (): void => {
    this.mode = this.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.mode)
    this.theme = createTheme(getDesignTokens(this.mode))
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const themeStore = new ThemeState()
