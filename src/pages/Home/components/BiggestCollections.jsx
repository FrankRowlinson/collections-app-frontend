import { Grid, Typography } from '@mui/material'
import { Trans } from '@lingui/macro'
import { useQuery } from 'react-query'
import { getBiggestCollections } from '../../../services/collectionAPI'
import { CollectionsSkeleton, CollectionCard } from './'

function BiggestCollections() {
  const { data, isLoading } = useQuery(
    ['biggestCollections'],
    getBiggestCollections
  )

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          <Trans>Biggest collections</Trans>
        </Typography>
      </Grid>
      {isLoading ? (
        <CollectionsSkeleton />
      ) : (
        data.collections.map((item, index) => {
          return <CollectionCard item={item} index={index} />
        })
      )}
    </>
  )
}

export default BiggestCollections
