import { useQuery } from 'react-query'
import { getTagsForCloud } from '../../../common/services'
import { Grid, Typography } from '@mui/material'
import { Trans } from '@lingui/macro'
import { TagCloud } from 'react-tagcloud'
import { TagRenderer } from '.'
import { TagSkeleton } from '.'

export function PopularTags() {
  const { data, isLoading } = useQuery(['popularTags'], getTagsForCloud)
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <Trans>Popular tags</Trans>
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ overflow: 'auto', mt: 1, height: '100%' }}>
        {isLoading ? (
          <TagSkeleton />
        ) : (
          <TagCloud
            tags={data?.tags || []}
            minSize={1}
            maxSize={4}
            renderer={TagRenderer}
          />
        )}
      </Grid>
    </Grid>
  )
}
