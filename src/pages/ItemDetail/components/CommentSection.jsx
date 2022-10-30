import { useState, useEffect, useContext } from 'react'
import { Stack, Paper, Typography, Grid, Box } from '@mui/material'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { getComments } from '../../../services/comments'
import { ItemContext } from '../../../context/ItemContext'
import Loader from '../../../shared/Loader'
import { t } from '@lingui/macro'

function CommentSection() {
  const { itemId } = useContext(ItemContext)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState(null)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getComments(itemId)
      setComments(data.comments)
      setIsLoading(false)
    }
    fetchData()
    setTimeout(() => {
      setUpdate(!update)
    }, 5000)
  }, [itemId, update])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid item container xs={12}>
          <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6">{t`${comments.length} comment(s)`}</Typography>
            <CommentForm update={update} setUpdate={setUpdate} />
            <Stack spacing={1.5}>
              {comments.map((comment, index) => {
                return (
                  <Box key={`comment-${index}`}>
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
