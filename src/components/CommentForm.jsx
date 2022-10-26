import { useForm, useWatch } from 'react-hook-form'
import { TextField, Button, Grid, Box } from '@mui/material'
import { useContext } from 'react'
import { ItemContext } from '../context/ItemContext'
import { createComment } from '../services/comments'
import { useState } from 'react'
import ButtonProgress from './ButtonProgress'
import { UserContext } from '../context/UserContext'

function CommentForm({ update, setUpdate }) {
  const { user } = useContext(UserContext)
  const { itemId } = useContext(ItemContext)
  const { register, handleSubmit, control, resetField } = useForm()
  const [inProgress, setInProgress] = useState(false)
  const comment = useWatch({ control, name: 'commentField' })
  const onSubmit = async (data) => {
    setInProgress(true)
    createComment(itemId, data).then(() => {
      setInProgress(false)
      setUpdate(!update)
      resetField('commentField')
    })
  }
  return (
    <Box sx={{ pt: 3, px: 2, width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} id="comment-form">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              placeholder={
                user.role === 'GUEST'
                  ? 'You have to be a member to comment...'
                  : 'Start typing your comment...'
              }
              fullWidth
              disabled={user.role === 'GUEST'}
              {...register('commentField')}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              disabled={!comment || inProgress}
              sx={{ mt: '2px' }}
              variant={comment ? 'contained' : 'outlined'}
              type="submit"
            >
              Leave comment
              <ButtonProgress size={24} inProgress={inProgress} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CommentForm
