import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

function AuthPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Box
        sx={{
          maxWidth: '600px',
          maxHeight: '800px',
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default AuthPage
