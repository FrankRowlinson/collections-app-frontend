import { yupResolver } from '@hookform/resolvers/yup'
import { t, Trans } from '@lingui/macro'
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { routes } from '../../../common/constants'
import { UserContext } from '../../../common/context'
import { authenticateUser } from '../../../common/services'
import { AuthButton, AuthError } from '.'

const requiredUsernameError = t`Enter a valid username`
const requiredPasswordError = t`Valid password is required`

const schema = yup.object({
  username: yup.string().required(requiredUsernameError).min(4).max(25),
  password: yup.string().required(requiredPasswordError),
})

export function LoginForm() {
  const [inProgress, setInProgess] = useState(false)
  const [status, setStatus] = useState(null)
  const { user } = useContext(UserContext)

  const {
    register,
    formState: { errors },
    resetField,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: any) => {
    setInProgess(true)
    const response = await authenticateUser(data, 'login')
    if (response.status === 'ok') {
      window.location.reload()
    } else {
      setStatus(response.error)
      resetField('password')
    }
    setInProgess(false)
  }

  return (
    <>
      <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '10px' }}>
        {user?.role !== 'GUEST' && <Navigate to={routes.HOME} />}
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
                helperText={
                  errors.username &&
                  (errors.username.message as React.ReactNode)
                }
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
                {...register('password')}
              />
              <AuthButton inProgress={inProgress} text={t`Sign In`} />
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
