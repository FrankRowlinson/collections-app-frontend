import { Trans } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

export function NotFoundPage() {
  const location = useLocation()
  const message = location.state ? (
    location.state.message
  ) : (
    <Trans>404 NOT FOUND</Trans>
  )
  return (
    <Container maxWidth="lg">
        <Typography variant="h2">{message}</Typography>
    </Container>
  )
}
