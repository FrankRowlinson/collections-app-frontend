import { useLocation } from 'react-router-dom'
import { Grid, Container } from '@mui/material'
import { useQuery } from 'react-query'
import { getFavouriteItems } from '../../common/services'
import { ItemList, Loader } from '../../common/components'

export function Favourites() {
  const location = useLocation()
  const { data, isLoading } = useQuery(
    [location.state.id],
    getFavouriteItems(location.state.id)
  )
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} sx={{ alignItems: 'stretch' }}>
        {isLoading ? <Loader /> : <ItemList items={data.items} />}
      </Grid>
    </Container>
  )
}
