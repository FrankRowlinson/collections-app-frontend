import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import { authenticateUser } from '../services/authentication'
import routes from '../constants/routes'
import AuthButton from './AuthButton'
import AuthError from './AuthError'
import FormPopover from './FormPopover'
import { t, Trans } from '@lingui/macro'

const schema = yup.object({
  username: yup
    .string()
    .required(t`Enter a valid username`)
    .min(4)
    .max(25)
    .matches(/^[a-z]+[a-z0-9]*/i, t`Username must not start with digit`),
  email: yup
    .string()
    .email()
    .required(t`Enter a valid email address`),
  password: yup
    .string()
    .required(t`Choose secure password`)
    .min(8),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], t`Passwords must match`),
})

function SignupForm() {
  const navigate = useNavigate()
  const [inProgress, setInProgress] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await authenticateUser(data, 'signup')
    response.status === 'ok'
      ? navigate(routes.LOGIN, { state: { success: true } })
      : setShowStatus(true)
    resetField('password')
    resetField('passwordRepeat')
    setInProgress(false)
  }

  return (
    <>
      <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '10px' }}>
        <CardHeader
          title={t`Sign Up`}
          subheader={
            <Typography
              component={Link}
              sx={{ color: 'text.secondary' }}
              to={routes.LOGIN}
            >
              <Trans>Already have an account?</Trans>
            </Typography>
          }
          subheaderTypographyProps={{ component: 'span' }}
        />
        <CardContent sx={{}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stack spacing={3}>
              {showStatus && <AuthError form="signUp" />}
              <TextField
                id="username"
                label={t`Username`}
                type="text"
                variant="standard"
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FormPopover field="signup-username" />
                    </InputAdornment>
                  ),
                }}
                {...register('username')}
              />
              <TextField
                id="password"
                type="password"
                label={t`Password`}
                variant="standard"
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FormPopover field="signup-password" />
                    </InputAdornment>
                  ),
                }}
                {...register('password')}
              />
              <TextField
                id="repeat-password"
                type="password"
                label={t`Password again`}
                variant="standard"
                error={Boolean(errors.passwordRepeat)}
                helperText={
                  errors.passwordRepeat && errors.passwordRepeat.message
                }
                {...register('passwordRepeat')}
              />

              <TextField
                id="email"
                label={t`Email`}
                type="email"
                variant="standard"
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                {...register('email')}
              />
              <AuthButton inProgress={inProgress} text={t`Sign Up`} />
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default SignupForm
