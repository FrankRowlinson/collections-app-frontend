import React from 'react'
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MdInfo } from 'react-icons/md'

const schema = yup.object({
  username: yup.string().required('Enter a valid username').min(4).max(25),
  email: yup.string().email().required('Enter a valid email address'),
  password: yup.string().required('Choose secure password').min(8),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = (data) => console.log(data)

  return (
    <Card raised sx={{ mt: '20px', p: 4, borderRadius: '20px' }}>
      <CardContent sx={{}}>
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
                    <MdInfo />
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
                    <MdInfo />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <MdInfo />
                  </InputAdornment>
                ),
              }}
              {...register('email')}
            />
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignupForm
