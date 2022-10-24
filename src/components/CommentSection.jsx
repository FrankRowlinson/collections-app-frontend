import { useState, useEffect, useContext } from 'react'
import { Stack, Paper, Typography, Grid, Box } from '@mui/material'
import CommentForm from './CommentForm'
import Comment from '../components/Comment'
import { getComments } from '../services/comments'
import { ItemContext } from '../context/ItemContext'
import Loader from '../pages/Loader/Loader'

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
      console.log(data.comments)
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
            <Typography variant="h6">{comments.length} comment(s)</Typography>
            <CommentForm />
            <Stack spacing={1.5}>
              {comments.map((comment, index) => {
                return (
                  <Box>
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
