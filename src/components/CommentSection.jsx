import React from 'react'
import { Stack,   Paper, Typography } from '@mui/material'
import moment from 'moment'

function CommentSection(props) {
  const { comments } = props
  return (
    <Stack spacing={1}>
      {comments.map((el, key) => {
        return (
          <Paper>
            <Typography variant="overline">{moment(el.createdAt).format('LLL')}</Typography>
            <Typography variant="h6">{el.author}</Typography>
            <Typography variant="body2">{el.text}</Typography>
          </Paper>
        )
      })}
    </Stack>
  )
}

export default CommentSection
