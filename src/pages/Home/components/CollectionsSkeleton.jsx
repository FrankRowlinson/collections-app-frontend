import { Grid, Skeleton } from '@mui/material'

function CollectionsSkeleton() {
  return (
    <>
      {[...Array(5).keys()].map((item, index) => {
        return (
          <Grid
            key={`biggest-collections-skeleton-${item}`}
            item
            xs={12}
            sm={index ? 6 : 12}
            md={index === 1 || index === 0 ? 6 : 4}
            lg={index ? 6 : 12}
            sx={{ display: 'flex' }}
          >
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width="100%"
              sx={{
                height: {
                  xs: 300,
                  sm: index ? 250 : 500,
                  md: index === 1 || index === 0 ? 300 : 200,
                  lg: index ? 200 : 400,
                },
              }}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default CollectionsSkeleton
