import {
  Typography,
  Grid,
  Divider,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

function SearchResults() {
  const {
    state: { query, items },
  } = useLocation()
  const navigate = useNavigate()

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5">
            {query ? `Search results for: "${query}"` : 'Selected items'}
          </Typography>
          <Divider />
        </Grid>
        {items ? (
          items.map((el, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`search-item-${index}`}
            >
              <CardActionArea
                onClick={() => {
                  navigate(`${routes.ITEMS}/byid/${el.id}`)
                }}
              >
                <Card sx={{ width: '100%', height: '100%' }}>
                  <CardHeader
                    title={el.name}
                    subheader={`by ${el.author.username}`}
                  />
                  <CardMedia
                    component="img"
                    sx={{ height: { xs: 350, sm: 300, md: 250 } }}
                    image={
                      el.img || 'https://via.placeholder.com/300?text=No+image'
                    }
                    alt=""
                  />
                  <CardContent>
                    <Typography variant="overline">
                      {el.partOf.type.name} | {el.partOf.name}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">
            Found nothing... try different query
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default SearchResults
