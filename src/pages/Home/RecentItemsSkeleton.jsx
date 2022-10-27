import { Grid, Skeleton } from '@mui/material'

function RecentItemsSkeleton() {
  return (
    <>
      {[...Array(12).keys()].map((item, index) => {
        return (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            sx={{ display: 'flex' }}
            key={`recent-item-skeleton-${index}`}
          >
            <Skeleton
              variant="rectangular"
              animation='pulse'
              width="100%"
              sx={{ height: { xs: 200, sm: 200, md: 175, lg: 125 } }}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default RecentItemsSkeleton
