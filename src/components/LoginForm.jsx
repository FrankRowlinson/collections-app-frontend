import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  Card,
  CardHeader,
  Snackbar,
  TextField,
  CardContent,
  Stack,
  Typography,
  Alert,
} from '@mui/material'
import routes from '../constants/routes'
import { authenticateUser } from '../services/authentication'
import { UserContext } from '../context/UserContext'
import AuthButton from './AuthButton'
import AuthError from './AuthError'
import Cookies from 'js-cookie'

const schema = yup.object({
  username: yup.string().required('Enter a valid username').min(4).max(25),
  password: yup.string().required('Valid password is required'),
})

function LoginForm() {
  const { state: success } = useLocation()
  const [snackbarOpen, setSnackbarOpen] = useState(!!success)
  const [inProgress, setInProgess] = useState(false)
  const [status, setStatus] = useState(null)
  const { user, setCookie } = useContext(UserContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setInProgess(true)
    const response = await authenticateUser(data, 'login')
    if (response.status === 'ok') {
      setCookie(Cookies.get('token'))
      window.location.reload(false)
    } else {
      setStatus(response.error)
    }
    setInProgess(false)
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <>
      <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '10px' }}>
        {user.role !== 'GUEST' && <Navigate to={routes.HOME} />}
        <CardHeader
          title="Sign In"
          subheader={
            <Typography
              component={Link}
              sx={{ color: 'text.secondary' }}
              to={routes.SIGNUP}
            >
              Don't have an account?
            </Typography>
          }
        />
        <CardContent sx={{}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stack spacing={3}>
              {status && errors.length === 0 ? (
                <AuthError form="signIn" status={status} />
              ) : (
                ''
              )}
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
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        autoHideDuration={5000}
        sx={{ position: 'absolute' }}
        message="You've signed up successfully"
      />
    </>
  )
}

export default LoginForm
