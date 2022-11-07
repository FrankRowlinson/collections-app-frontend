import { Grid, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { getRecentItems } from '../../../services/itemAPI'
import { Trans } from '@lingui/macro'
import { RecentItemsSkeleton, ItemCard } from './'

function RecentItems() {
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
        data.items.map((item) => {
          return <ItemCard item={item} />
        })
      )}
    </>
  )
}

export default RecentItems
