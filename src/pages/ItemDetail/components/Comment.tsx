import moment from 'moment'
import { Typography } from '@mui/material'
import { t } from '@lingui/macro'

interface Props {
  comment: Comment
}

export function Comment({ comment }: Props) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, display: 'inline-block', mr: 1 }}
      >
        {comment.author ? comment.author.username : t`DELETED`}
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
