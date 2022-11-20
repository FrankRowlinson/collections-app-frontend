import { Alert, Typography } from '@mui/material'
import { Trans } from '@lingui/macro'

export function Warning() {
  return (
    <Alert color="error" variant="filled">
      <Typography variant="h6">
        <Trans>Access denied</Trans>
      </Typography>
      <Typography variant="body1">
        <Trans>
          Seems like you've logged in as user with no admin rights or visiting
          as guest.
        </Trans>
      </Typography>
    </Alert>
  )
}
