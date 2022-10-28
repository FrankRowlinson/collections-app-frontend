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
} from '@mui/material'
import routes from '../constants/routes'
import { authenticateUser } from '../services/authentication'
import { UserContext } from '../context/UserContext'
import AuthButton from './AuthButton'
import AuthError from './AuthError'
import { t, Trans } from '@lingui/macro'

const requiredUsernameError = t`Enter a valid username`
const requiredPasswordError = t`Valid password is required`

const schema = yup.object({
  username: yup.string().required(requiredUsernameError).min(4).max(25),
  password: yup.string().required(requiredPasswordError),
})

function LoginForm() {
  const { state: success } = useLocation()
  const [snackbarOpen, setSnackbarOpen] = useState(!!success)
  const [inProgress, setInProgess] = useState(false)
  const [status, setStatus] = useState(null)
  const { user } = useContext(UserContext)

  const {
    register,
    formState: { errors },
    resetField,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setInProgess(true)
    const response = await authenticateUser(data, 'login')
    if (response.status === 'ok') {
      window.location.reload(false)
    } else {
      setStatus(response.error)
      resetField('password')
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
          title={t`Sign In`}
          subheader={
            <Typography
              component={Link}
              sx={{ color: 'text.secondary' }}
              to={routes.SIGNUP}
            >
              <Trans>Don't have an account?</Trans>
            </Typography>
          }
        />
        <CardContent sx={{}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stack spacing={3}>
              {status && <AuthError form="signIn" status={status} />}
              <TextField
                id="username"
                label={t`Username`}
                type="text"
                variant="standard"
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
                {...register('username')}
              />
              <TextField
                id="password"
                type="password"
                label={t`Password`}
                variant="standard"
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
                {...register('password')}
              />
              <AuthButton inProgress={inProgress} text={t`Sign In`} />
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        autoHideDuration={5000}
        sx={{ position: 'absolute' }}
        message={t`You've signed up successfully`}
      />
    </>
  )
}

export default LoginForm
