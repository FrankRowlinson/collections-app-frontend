import { useForm, useWatch } from 'react-hook-form'
import { TextField, Button, Grid, Box } from '@mui/material'
import { useContext } from 'react'
import { ItemContext, UserContext } from '../../../context'
import { createComment } from '../../../services/commentAPI'
import { useState } from 'react'
import { ButtonProgress } from '../../../shared'
import { Trans, t } from '@lingui/macro'

function CommentForm({ refetch }) {
  const { user } = useContext(UserContext)
  const { itemId } = useContext(ItemContext)
  const { register, handleSubmit, control, resetField } = useForm()
  const [inProgress, setInProgress] = useState(false)
  const comment = useWatch({ control, name: 'commentField' })
  const onSubmit = async (data) => {
    setInProgress(true)
    createComment(itemId, data).then(() => {
      setInProgress(false)
      refetch()
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
                  ? t`You have to be a member to comment...`
                  : t`Start typing your comment...`
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
              <Trans>Leave comment</Trans>
              <ButtonProgress inProgress={inProgress} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CommentForm
