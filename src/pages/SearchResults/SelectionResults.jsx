import { Container, Grid, Typography } from '@mui/material'
import { t } from '@lingui/macro'
import { SearchItem } from './components'
import { useLocation } from 'react-router-dom'

function SelectionResults() {
  const {
    state: { items },
  } = useLocation()
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {t`Selected items`}
          </Typography>
        </Grid>
        {items.map((item) => (
          <SearchItem item={item} key={item.id} />
        ))}
      </Grid>
    </Container>
  )
}

export default SelectionResults
