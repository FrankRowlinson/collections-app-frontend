import { Container, Grid, Typography } from '@mui/material'
import { t } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { ItemList } from '../../common/components'

export function SelectionResults() {
  const {
    state: { items },
  } = useLocation()
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {t`Selected items`}
          </Typography>
        </Grid>
        <ItemList items={items} />
      </Grid>
    </Container>
  )
}
