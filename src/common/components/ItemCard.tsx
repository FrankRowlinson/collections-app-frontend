import {
  CardActionArea,
  CardMedia,
  Card,
  Typography,
  CardContent,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../constants'
import { t } from '@lingui/macro'
import { usePlaceholder } from '../hooks'

interface Props {
  item: ItemInfo
}

export function ItemCard({ item }: Props) {
  const navigate = useNavigate()
  const placeholder = usePlaceholder(t`No+image`)
  return (
    <CardActionArea
      onClick={() => {
        navigate(`${routes.ITEMS}/byid/${item.id}`)
      }}
    >
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          sx={{ height: { xs: 350, sm: 300, md: 250 } }}
          image={item.img || placeholder}
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
  )
}
