import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Card,
  CardHeader,
  TextField,
  Button,
  CardContent,
  Stack,
  Alert,
  InputProps,
  InputAdornment,
} from '@mui/material'
import { MdInfo } from 'react-icons/md'

const schema = yup.object({
  username: yup.string().required('Enter a valid username').min(4).max(25),
  password: yup.string().required('Choose secure password'),
})

function LoginForm() {
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
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
