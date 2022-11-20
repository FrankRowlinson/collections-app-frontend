import { yupResolver } from '@hookform/resolvers/yup'
import {
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { t, Trans } from '@lingui/macro'
import { routes } from '../../../common/constants'
import { authenticateUser } from '../../../common/services'
import { AuthButton, AuthError, FormPopover } from '.'
import { useSnackbar } from 'notistack'

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

export function SignupForm() {
  const navigate = useNavigate()
  const [inProgress, setInProgress] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: any) => {
    setInProgress(true)
    const response = await authenticateUser(data, 'signup')
    if (response.status === 'ok') {
      enqueueSnackbar(t`You have successfully signed up`)
      navigate(routes.LOGIN)
    } else {
      setShowStatus(true)
    }
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
              {showStatus && <AuthError form="signUp" status="error" />}
              <TextField
                id="username"
                label={t`Username`}
                type="text"
                variant="standard"
                error={Boolean(errors.username)}
                helperText={
                  errors.username &&
                  (errors.username.message as React.ReactNode)
                }
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
                helperText={
                  errors.password &&
                  (errors.password.message as React.ReactNode)
                }
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
                  errors.passwordRepeat &&
                  (errors.passwordRepeat.message as React.ReactNode)
                }
                {...register('passwordRepeat')}
              />

              <TextField
                id="email"
                label={t`Email`}
                type="email"
                variant="standard"
                error={Boolean(errors.email)}
                helperText={
                  errors.email && (errors.email.message as React.ReactNode)
                }
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
