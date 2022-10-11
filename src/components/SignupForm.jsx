import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Alert,
  InputAdornment,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, redirect } from 'react-router-dom'

import { authenticateUser } from '../services/authentication'
import routes from '../constants/routes'
import AuthButton from './AuthButton'
import AuthError from './AuthError'
import FormPopover from './FormPopover'

const schema = yup.object({
  username: yup.string().required('Enter a valid username').min(4).max(25),
  email: yup.string().email().required('Enter a valid email address'),
  password: yup.string().required('Choose secure password').min(8),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function SignupForm() {
  const [inProgress, setInProgress] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await authenticateUser(data, 'signup')
    response.status === 'ok' ? redirect(routes.LOGIN) : setShowStatus(true)
    setInProgress(false)
  }

  return (
    <>
      <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '10px' }}>
        <CardHeader
          title="Sign Up"
          subheader={<Link to={routes.LOGIN}>Already have an account?</Link>}
          subheaderTypographyProps={{ component: 'span' }}
        />
        <CardContent sx={{}}>
          {showStatus && <AuthError form="signUp" />}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FormPopover field="signup-username" />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FormPopover field="signup-password" />
                    </InputAdornment>
                  ),
                }}
                {...register('password')}
              />
              {errors.passwordRepeat ? (
                <Alert color="error">{errors.passwordRepeat.message}</Alert>
              ) : (
                ''
              )}
              <TextField
                id="repeat-password"
                type="password"
                label="Password again"
                variant="standard"
                {...register('passwordRepeat')}
              />
              {errors.email ? (
                <Alert color="error">{errors.email.message}</Alert>
              ) : (
                ''
              )}
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="standard"
                {...register('email')}
              />
              <AuthButton inProgress={inProgress} text="Sign Up" />
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default SignupForm
