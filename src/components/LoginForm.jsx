import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import {
  Card,
  CardHeader,
  TextField,
  CardContent,
  Stack,
  Alert,
} from '@mui/material'
import routes from '../constants/routes'
import { authenticateUser, getUser } from '../services/authentication'
import { UserContext } from '../context/UserContext'
import AuthButton from './AuthButton'
import AuthError from './AuthError'

const schema = yup.object({
  username: yup.string().required('Enter a valid username').min(4).max(25),
  password: yup.string().required('Valid password is required'),
})

function LoginForm() {
  const [inProgress, setInProgess] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setInProgess(true)
    const response = await authenticateUser(data, 'login')
    if (response.status === 'ok') {
      setUser(getUser())
    } else {
      setShowStatus(true)
    }
    setInProgess(false)
  }

  return (
    <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '10px' }}>
      {user.role !== 'GUEST' && <Navigate to={routes.HOME} />}
      <CardHeader
        title="Sign In"
        subheader={<Link to={routes.SIGNUP}>Don't have an account?</Link>}
      />
      <CardContent sx={{}}>
        {showStatus ? <AuthError form='signUp'/> : ''}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Stack spacing={3}>
            {errors.username ? (
              <Alert color="error">{errors.username.message}</Alert>
            ) : (
              ''
            )}
            <TextField
              id="username"
              label="Username"
              type="text"
              variant="standard"
              {...register('username')}
            />
            {errors.password ? (
              <Alert color="error">{errors.password.message}</Alert>
            ) : (
              ''
            )}
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="standard"
              {...register('password')}
            />
            <AuthButton inProgress={inProgress} text="Sign In" />
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
