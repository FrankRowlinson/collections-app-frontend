import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from '@mui/material'
import { routes } from '../../../common/constants'
import moment from 'moment'
import { t } from '@lingui/macro'
import { usePlaceholder } from '../../../common/hooks'

interface Props {
  item: CollectionInfo
}

export function CollectionCard({ item }: Props) {
  const navigate = useNavigate()
  const placeholder = usePlaceholder(t`No+image`)
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
      <CardActionArea
        onClick={() => {
          navigate(`${routes.COLLECTIONS}/byid/${item.id}`)
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 0,
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: { xs: 300, sm: 250, md: 200 } }}
            image={
              item.img || placeholder
            }
            alt=""
          />
          <CardContent>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500 }}
              component="div"
            >
              {item.name}
            </Typography>
            <Typography variant="overline" color="text.secondary">
              {item.type.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(item.createdAt).format('LL')}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
}
