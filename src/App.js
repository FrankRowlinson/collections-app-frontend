import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { UserContext } from './context/UserContext'
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
import { getDesignTokens } from './themes/getDesignTokens'
import CollectionDetail from './pages/CollectionDetail/CollectionDetail'
import UserProfile from './pages/UserProfile/UserProfile'
import SearchResults from './pages/SearchResults/SearchResults'
import AdminPage from './pages/AdminPage/AdminPage'

function App() {
  const [user, setUser] = useState({ role: 'GUEST' })
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const navigate = useNavigate()
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

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
      if (user.hasAccess) {
        setUser(user)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider>
          <UserContext.Provider value={{ user, setUser, handleLogout }}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <NavBar />
                <Box
                  sx={{
                    mt: { xs: '20px', md: '30px' },
                    mb: { xs: '20px', md: '60px' },
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
                    <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
                    <Route path={routes.ADMIN} element={<AdminPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                  </Routes>
                </Box>
              </>
            )}
          </UserContext.Provider>
        </ConfirmProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
