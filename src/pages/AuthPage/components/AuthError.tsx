import { Alert } from '@mui/material'
import { t } from '@lingui/macro'

interface Props {
  form: 'signIn' | 'signUp'
  status: string
}

const errorsMapping: Mapping = {
  blocked: t`Access restricted`,
  wrong: t`Username or password are incorrect`,
}

export function AuthError({ form, status }: Props) {
  const text =
    form === 'signIn'
      ? errorsMapping[status]
      : form === 'signUp' && t`User with this username or email already exists`
  return <Alert color="error">{text}</Alert>
}
