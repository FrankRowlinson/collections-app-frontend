import moment from 'moment'
import { Typography } from '@mui/material'
import { t } from '@lingui/macro'

function Comment({ comment }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, display: 'inline-block', mr: 1 }}
      >
        {comment.author ? comment.author.name : t`DELETED`}
      </Typography>
      <Typography
        variant="body2"
        sx={{ display: 'inline-block', color: 'text.secondary' }}
      >
        {moment(comment.createdAt).fromNow()}
      </Typography>
      <Typography variant="body1">{comment.text}</Typography>
    </>
  )
}

export default Comment
