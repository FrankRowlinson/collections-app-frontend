import { useContext } from 'react'
import { Stack, Paper, Typography, Grid, Box } from '@mui/material'
import { Comment, CommentForm } from './'
import { getComments } from '../../../services/commentAPI'
import { ItemContext } from '../../../context'
import { Loader } from '../../../shared'
import { t } from '@lingui/macro'
import { useQuery } from 'react-query'

function CommentSection() {
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
              {data.comments.map((comment) => {
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

export default CommentSection
