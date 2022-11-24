import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ConfirmProvider } from 'material-ui-confirm'
import { SnackbarProvider } from 'notistack'
import { useCallback } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { routes } from './common/constants'
import { UserContext } from './common/context'
import {
  AddCollection,
  AdminPage,
  Favourites,
  AuthPage,
  CollectionDetail,
  Home,
  ItemDetail,
  NotFoundPage,
  SearchResults,
  SelectionResults,
  UserProfile,
} from './pages'
import { getCurrentUser, logout } from './common/services'
import { Loader, Navbar } from './common/components'
import { localeStore, themeStore } from './stores'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'

function App() {
  const { data, isLoading, refetch } = useQuery(['currentUser'], getCurrentUser)
  const navigate = useNavigate()
  localeStore.initializeLocalization()

  const handleLogout = useCallback(async () => {
    const response = await logout()
    if (response.status === 'ok') {
      refetch()
      navigate(routes.HOME)
    }
  }, [navigate, refetch])

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={themeStore.theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <SnackbarProvider>
            <CssBaseline />
            <ConfirmProvider>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <UserContext.Provider
                    value={{
                      user: data || { role: 'GUEST' },
                      refetch,
                      handleLogout
                    }}
                  >
                    <Navbar />
                    <Box
                      sx={{
                        mt: 2,
                        mb: 5,
                      }}
                    >
                      <Routes>
                        <Route path={routes.HOME} element={<Home />} />
                        <Route
                          path={routes.USER_PROFILE}
                          element={<UserProfile />}
                        />
                        <Route
                          path={`${routes.USER_PROFILE}/:id`}
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
                            data.role === 'GUEST' ? (
                              <AuthPage />
                            ) : (
                              <Navigate to={routes.HOME} />
                            )
                          }
                        />
                        <Route
                          path={routes.CREATE_COLLECTION}
                          element={
                            data.role !== 'GUEST' ? (
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
                          path={routes.FAVOURITES}
                          element={<Favourites />}
                        />
                        <Route
                          path={routes.NOT_FOUND}
                          element={<NotFoundPage />}
                        />
                        <Route path={routes.ADMIN} element={<AdminPage />} />
                        <Route path="/*" element={<NotFoundPage />} />
                      </Routes>
                    </Box>
                  </UserContext.Provider>
                </>
              )}
            </ConfirmProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default observer(App)
