import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../constants'
import { t } from '@lingui/macro'
import moment from 'moment'
import { usePlaceholder } from '../../../hooks'

const cardBackground =
  'linear-gradient(to top, rgba(0,0,0,1) 0%, ' +
  'rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)'

function ItemCard({ item }) {
  const navigate = useNavigate()
  const placeholder = usePlaceholder(t`No+image`)
  return (
    <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex' }}>
      <CardActionArea
        onClick={() => {
          navigate(`${routes.ITEMS}/byid/${item.id}`)
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 0,
            position: 'relative',
          }}
        >
          <CardMedia
            sx={{
              height: {
                xs: 200,
                sm: 200,
                md: 175,
                lg: 125,
              },
            }}
            image={
              item.img || placeholder
            }
            component="img"
          />
          <CardContent
            sx={{
              position: 'absolute',
              bottom: -20,
              background: cardBackground,
              width: '100%',
              px: 1,
            }}
          >
            <Typography
              variant="overline"
              color="#fff"
              sx={{ fontWeight: 500, lineHeight: 0.5 }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="rgba(255, 255, 255, 0.7)"
              sx={{ fontWeight: 400 }}
            >
              {moment(item.createdAt).fromNow()}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default ItemCard
