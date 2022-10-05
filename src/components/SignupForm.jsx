import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Button,
  Alert,
  InputAdornment,
  Popover,
  Typography,
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

  const [anchorLoginInfo, setAnchorLoginInfo] = useState(null)
  const [anchorPasswordInfo, setAnchorPasswordInfo] = useState(null)
  const handleLoginPopoverOpen = (event) => {
    setAnchorLoginInfo(event.currentTarget)
  }
  const handlePasswordPopoverOpen = (event) => {
    setAnchorPasswordInfo(event.currentTarget)(event.currentTarget)
  }
  const handleLoginPopoverClose = () => {
    setAnchorLoginInfo(null)
  }
  const handlePasswordPopoverClose = () => {
    setAnchorPasswordInfo(null)
  }
  const loginShow = Boolean(anchorLoginInfo)
  const passwordShow = Boolean(anchorPasswordInfo)

  return (
    <>
      <Card raised sx={{ mt: '20px', p: '10px 20px', borderRadius: '20px' }}>
        <CardHeader title="Sign Up" />
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
                      <MdInfo
                        onMouseEnter={handleLoginPopoverOpen}
                        onMouseLeave={handleLoginPopoverClose}
                      />
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
                      <MdInfo
                        onMouseEnter={handlePasswordPopoverOpen}
                        onMouseLeave={handlePasswordPopoverClose}
                      />
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
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Popover
        id="mouse-over-popover-login"
        sx={{
          pointerEvents: 'none',
        }}
        open={loginShow}
        anchorEl={anchorLoginInfo}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleLoginPopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Custom requirements for login!</Typography>
      </Popover>
      <Popover
        id="mouse-over-popover-password"
        sx={{
          pointerEvents: 'none',
        }}
        open={passwordShow}
        anchorEl={anchorPasswordInfo}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePasswordPopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Custom requirements for password!</Typography>
      </Popover>
    </>
  )
}

export default SignupForm
