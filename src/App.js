import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'

import { UserContext } from './context/UserContext'
import { LoaderContext } from './context/LoaderContext'
import { getUser, logout } from './services/authentication'

import NavBar from './components/NavBar'
import Home from './pages/Home/Home'
import AuthPage from './pages/AuthPage/AuthPage'
import AddCollection from './pages/AddCollection/AddCollection'
import ItemDetail from './pages/ItemDetail/ItemDetail'
import Loader from './pages/Loader/Loader'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import routes from './constants/routes'

function App() {
  const [user, setUser] = useState({ role: 'GUEST' })
  const [isLoading, setIsLoading] = useState(true)

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
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <LoaderContext.Provider value={isLoading}>
            <NavBar />
            <Container
              sx={{
                mt: { xs: '20px', sm: '30px' },
                mb: { xs: '20px', sm: '60px' },
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<ItemDetail />} />
                <Route
                  path="/auth/*"
                  element={
                    user.role === 'GUEST' ? (
                      <AuthPage />
                    ) : (
                      <Navigate to={routes.HOME} />
                    )
                  }
                />
                <Route
                  path="/create-collection"
                  element={
                    user.role !== 'GUEST' ? (
                      <AddCollection />
                    ) : (
                      <Navigate to={routes.SIGNUP} />
                    )
                  }
                />
                <Route path="/*" element={<NotFoundPage/>}/>
              </Routes>
            </Container>
          </LoaderContext.Provider>
        </>
      )}
    </UserContext.Provider>
  )
}

export default App
