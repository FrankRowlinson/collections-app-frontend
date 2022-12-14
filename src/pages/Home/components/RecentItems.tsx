import { Grid, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { getRecentItems } from '../../../common/services'
import { Trans } from '@lingui/macro'
import { RecentItemsSkeleton, ItemCard } from '.'

export function RecentItems() {
  const { data, isLoading } = useQuery(['recentItems'], getRecentItems)

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          <Trans>Recent items</Trans>
        </Typography>
      </Grid>
      {isLoading ? (
        <RecentItemsSkeleton />
      ) : (
        data.items.map((item: ItemInfo) => {
          return <ItemCard item={item} key={item.id} />
        })
      )}
    </>
  )
}
