import { Box, Container, Grid } from '@mui/material'
import { RecentItems, BiggestCollections, PopularTags } from './components'

export function Home() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            <Grid container spacing={0.5} sx={{ position: 'sticky', top: 0 }}>
              <BiggestCollections />
            </Grid>
          </Box>
        </Grid>
        <Grid item container xs={12} lg={6}>
          <Box
            sx={{
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            <Grid container spacing={1}>
              <RecentItems />
              <PopularTags />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
