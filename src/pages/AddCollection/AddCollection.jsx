import { Trans } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import { AddCollectionForm } from './components'

function AddCollection() {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        <Trans>Create new collection</Trans>
      </Typography>
      <AddCollectionForm />
    </Container>
  )
}
export default AddCollection
