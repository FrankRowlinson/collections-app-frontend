import { t, Trans } from '@lingui/macro'
import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

function SearchResults() {
  const {
    state: { type, query, items },
  } = useLocation()

  const searchResultHeaders = {
    tag: t`Search results by tag`,
    select: t`Selected items`,
    search: t`Search results for`,
  }

  const navigate = useNavigate()

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {searchResultHeaders[type] + (query ? `: ${query}` : '')}
          </Typography>
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
              sx={{ display: 'flex' }}
            >
              <CardActionArea
                onClick={() => {
                  navigate(`${routes.ITEMS}/byid/${el.id}`)
                }}
              >
                <Card sx={{ width: '100%', height: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: { xs: 350, sm: 300, md: 250 } }}
                    image={
                      el.img || 'https://via.placeholder.com/300?text=No+image'
                    }
                    alt=""
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {el.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 300 }}
                    >{t`by ${el.author.username}`}</Typography>
                    <Typography
                      variant="overline"
                      sx={{ color: 'text.secondary' }}
                    >
                      {el.partOf.type.name} | {el.partOf.name}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">
            <Trans>Found nothing... try different query</Trans>
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default SearchResults
