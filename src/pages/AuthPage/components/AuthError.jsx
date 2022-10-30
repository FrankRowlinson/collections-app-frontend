import { Alert } from '@mui/material'
import { t } from '@lingui/macro'

const errorsMapping = {
  blocked: t`Access restricted`,
  wrong: t`Username or password are incorrect`,
}

function AuthError({ form, status }) {
  const text =
    form === 'signIn'
      ? errorsMapping[status]
      : form === 'signUp' && t`User with this username or email already exists`
  return <Alert color="error">{text}</Alert>
}

export default AuthError
