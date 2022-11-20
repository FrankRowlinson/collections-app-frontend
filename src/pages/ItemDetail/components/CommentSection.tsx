import { useContext } from 'react'
import { Stack, Paper, Typography, Grid, Box } from '@mui/material'
import { Comment, CommentForm } from '.'
import { getComments } from '../../../common/services'
import { ItemContext } from '../../../common/context'
import { Loader } from '../../../common/components'
import { t } from '@lingui/macro'
import { useQuery } from 'react-query'

export function CommentSection() {
  const { itemId } = useContext(ItemContext)
  const { data, isLoading, refetch } = useQuery(
    ['comments'],
    getComments(itemId),
    {
      refetchInterval: 3000,
    }
  )

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid item container xs={12}>
          <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6">{t`${data.comments.length} comment(s)`}</Typography>
            <CommentForm refetch={refetch} />
            <Stack spacing={1.5}>
              {data.comments.map((comment: Comment) => {
                return (
                  <Box key={comment.id}>
                    <Comment comment={comment} />
                  </Box>
                )
              })}
            </Stack>
          </Paper>
        </Grid>
      )}
    </>
  )
}
