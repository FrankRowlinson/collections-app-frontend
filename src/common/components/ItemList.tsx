import { Grid } from '@mui/material'
import { ItemCard } from '.'

interface Props {
  items: ItemInfo[]
}

export function ItemList({ items }: Props) {
  return (
    <>
      {items.map((item: ItemInfo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </>
  )
}
