import React from 'react'
import { Alert } from '@mui/material'

const errorsMapping = {
  blocked: 'Access restricted',
  wrong: 'Username or password are incorrect',
}

function AuthError({ form, status }) {
  const text =
    form === 'signIn'
      ? errorsMapping[status]
      : form === 'signUp' && 'User with this username or email already exists'
  return <Alert color="error">{text}</Alert>
}

export default AuthError
