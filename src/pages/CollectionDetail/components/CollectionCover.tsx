import { Grid, Box } from '@mui/material'
import Image from 'mui-image'
import { useContext } from 'react'
import { CollectionContext } from '../../../common/context'

export function CollectionCover() {
  const { collection } = useContext(CollectionContext)
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ position: 'sticky', top: 20 }}>
        <Image src={collection.img} />
      </Box>
    </Grid>
  )
}
