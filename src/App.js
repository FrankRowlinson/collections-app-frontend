import React, { useState, useEffect, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
import CollectionsList from './pages/CollectionsList/CollectionsList'
import AddItem from './pages/AddItem/AddItem'

function App() {
  const [user, setUser] = useState({ role: 'GUEST' })
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')

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

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser()
      setUser(user)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    const response = await logout()
    if (response.status === 'ok') {
      setUser({ role: 'GUEST' })
      setIsLoading(false)
    }
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={{ user, setUser, handleLogout }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <NavBar />
              <Container
                sx={{
                  mt: { xs: '20px', sm: '30px' },
                  mb: { xs: '20px', sm: '60px' },
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path={routes.COLLECTIONS}
                    element={<CollectionsList />}
                  />
                  <Route
                    path={`${routes.COLLECTIONS}/:userId`}
                    element={<CollectionsList />}
                  />
                  <Route
                    path={`${routes.COLLECTIONS}/byid/:id`}
                    element={<CollectionDetail />}
                  />
                  <Route path="/items" element={<ItemDetail />} />
                  <Route
                    path={`${routes.ADD_ITEM}/:id`}
                    element={<AddItem />}
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
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>
              </Container>
            </>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
