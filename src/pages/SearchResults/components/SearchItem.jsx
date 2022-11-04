import {
  Grid,
  CardActionArea,
  CardMedia,
  Card,
  Typography,
  CardContent,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../constants'
import { t } from '@lingui/macro'

function SearchItem({ item }) {
  const navigate = useNavigate()
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
      <CardActionArea
        onClick={() => {
          navigate(`${routes.ITEMS}/byid/${item.id}`)
        }}
      >
        <Card sx={{ width: '100%', height: '100%' }}>
          <CardMedia
            component="img"
            sx={{ height: { xs: 350, sm: 300, md: 250 } }}
            image={
              item.img || t`https://via.placeholder.com/300?text=${t`No+image`}`
            }
            alt=""
          />
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 300 }}
            >{t`by ${item.author.username}`}</Typography>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {item.partOf.type.name} | {item.partOf.name}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default SearchItem
