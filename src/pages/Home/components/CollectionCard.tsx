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
import { t, Trans } from '@lingui/macro'
import { usePlaceholder } from '../../../hooks'

const cardBackground =
  'linear-gradient(to top, rgba(0,0,0,1) 0%, ' +
  'rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)'

interface Props {
  item: CollectionInfo
  index: number
}

export function CollectionCard({ item, index }: Props) {
  const navigate = useNavigate()
  const placeholder = usePlaceholder(t`No+image`)
  return (
    <Grid
      item
      xs={12}
      sm={index ? 6 : 12}
      md={index === 1 || index === 0 ? 6 : 4}
      lg={index ? 6 : 12}
      sx={{ display: 'flex' }}
    >
      <CardActionArea
        onClick={() => {
          navigate(`${routes.COLLECTIONS}/byid/${item.id}`)
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '0',
            position: 'relative',
          }}
        >
          <CardMedia
            sx={{
              height: {
                xs: 300,
                sm: index ? 250 : 500,
                md: index === 1 || index === 0 ? 300 : 200,
                lg: index ? 200 : 400,
              },
            }}
            image={item.img || placeholder}
            component="img"
          />
          <CardContent
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: cardBackground,
            }}
          >
            <Typography
              variant="overline"
              color="#fff"
              sx={{
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="#fff"
              sx={{ fontSize: 13, fontWeight: 300 }}
              textAlign="end"
            >
              <Trans>{item._count?.items} item(s)</Trans>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
}
