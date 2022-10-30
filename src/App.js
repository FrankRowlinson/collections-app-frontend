import { useState, useEffect, useMemo, useCallback } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import moment from 'moment'
import localization from 'moment/locale/pl'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { messages as enMessages } from './locales/en/messages'
import { messages as plMessages } from './locales/pl/messages'
import { en, pl } from 'make-plural/plurals'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { SnackbarProvider } from 'notistack'
import { getUser, logout } from './services/authentication'
import routes from './constants/routes'
import NavBar from './components/NavBar'
import Home from './pages/Home/Home'
import AuthPage from './pages/AuthPage/AuthPage'
import AddCollection from './pages/AddCollection/AddCollection'
import ItemDetail from './pages/ItemDetail/ItemDetail'
import Loader from './pages/Loader/Loader'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { ColorModeContext } from './context/ColorModeContext'
import { UserContext } from './context/UserContext'
import { getDesignTokens } from './themes/getDesignTokens'
import CollectionDetail from './pages/CollectionDetail/CollectionDetail'
import UserProfile from './pages/UserProfile/UserProfile'
import SearchResults from './pages/SearchResults/SearchResults'
import AdminPage from './pages/AdminPage/AdminPage'
import { LocaleContext } from './context/LocaleContext'
import SelectionResults from './pages/SearchResults/SelectionResults'

function App() {
  const [user, setUser] = useState({ role: 'GUEST' })
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en')
  const navigate = useNavigate()
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  // theme
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const currentMode = prevMode === 'light' ? 'dark' : 'light'
          localStorage.setItem('theme', currentMode)
          return currentMode
        })
      },
    }),
    []
  )

  // i18n
  i18n.loadLocaleData({
    en: { plurals: en },
    pl: { plurals: pl },
  })

  const localeMode = useMemo(
    () => ({
      changeLocale: (locale) => {
        setLocale(locale)
        localStorage.setItem('locale', locale)
        i18n.activate(locale)
        moment.updateLocale(locale, localization)
      },
    }),
    []
  )

  i18n.load('en', enMessages)
  i18n.load('pl', plMessages)
  i18n.activate(locale)
  moment.updateLocale(locale, localization)

  const handleLogout = useCallback(async () => {
    setIsLoading(true)
    const response = await logout()
    if (response.status === 'ok') {
      setUser({ role: 'GUEST' })
      setIsLoading(false)
      navigate(routes.HOME)
    }
  }, [navigate])

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser()
      user.hasAccess && setUser(user)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <I18nProvider i18n={i18n}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <LocaleContext.Provider value={{ localeMode, locale }}>
              <SnackbarProvider>
                <CssBaseline />
                <ConfirmProvider>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <UserContext.Provider
                        value={{ user, setUser, handleLogout }}
                      >
                        <NavBar />
                        <Box
                          sx={{
                            mt: 2,
                            mb: 5,
                          }}
                        >
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                              path={routes.USER_PROFILE}
                              element={<UserProfile />}
                            />
                            <Route
                              path={`${routes.USER_PROFILE}/:userId`}
                              element={<UserProfile />}
                            />
                            <Route
                              path={`${routes.COLLECTIONS}/byid/:id`}
                              element={<CollectionDetail />}
                            />
                            <Route
                              path={`${routes.ITEMS}/byid/:id`}
                              element={<ItemDetail />}
                            />
                            <Route
                              path={`${routes.AUTH}/*`}
                              element={
                                user.role === 'GUEST' ? (
                                  <AuthPage />
                                ) : (
                                  <Navigate to={routes.HOME} />
                                )
                              }
                            />
                            <Route
                              path={routes.CREATE_COLLECTION}
                              element={
                                user.role !== 'GUEST' ? (
                                  <AddCollection />
                                ) : (
                                  <Navigate to={routes.SIGNUP} />
                                )
                              }
                            />
                            <Route
                              path={routes.SEARCH_RESULTS}
                              element={<SearchResults />}
                            />
                            <Route
                              path={routes.SELECTION_RESULTS}
                              element={<SelectionResults />}
                            />
                            <Route
                              path={routes.NOT_FOUND}
                              element={<NotFoundPage />}
                            />
                            <Route
                              path={routes.ADMIN}
                              element={<AdminPage />}
                            />
                            <Route path="/*" element={<NotFoundPage />} />
                          </Routes>
                        </Box>
                      </UserContext.Provider>
                    </>
                  )}
                </ConfirmProvider>
              </SnackbarProvider>
            </LocaleContext.Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </I18nProvider>
  )
}

export default App
