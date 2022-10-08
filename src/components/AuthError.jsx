import React from 'react'
import { Alert } from '@mui/material'

function AuthError({ form }) {
  const text =
    form === 'signIn'
      ? 'Username or password are incorrect'
      : form === 'signUp' && 'User with this username or email already exists'
  return <Alert color="error">{text}</Alert>
}

export default AuthError
