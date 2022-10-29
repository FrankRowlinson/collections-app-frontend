import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import MarkdownPreview from '../../components/MarkdownPreview'
import { CollectionContext } from '../../context/CollectionContext'
import { Trans, t } from '@lingui/macro'
import { editCollection } from '../../services/manageCollection'
import { useSnackbar } from 'notistack'
import ButtonProgress from '../../components/ButtonProgress'

function CollectionEditForm({ collectionId, open, setEditFormOpen }) {
  const { enqueueSnackbar } = useSnackbar()
  const [inProgress, setInProgress] = useState(false)
  const defaultValues = useContext(CollectionContext)
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues,
  })
  const handleClose = () => {
    reset()
    setEditFormOpen(false)
  }
  const onSubmit = async (data) => {
    setInProgress(true)
    if (
      data.name === defaultValues.name &&
      data.description === defaultValues.description
    ) {
      enqueueSnackbar(t`You haven't made any changes`, { variant: 'warning' })
    } else {
      const response = await editCollection(collectionId, data)
      if (response.status === 'ok') {
        enqueueSnackbar('Collection info successfully edited', {
          variant: 'success',
        })
        handleClose()
      } else {
        enqueueSnackbar(t`Error happened on server. Try again later`, {
          variant: 'error',
        })
      }
    }
    setInProgress(false)
  }
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Trans>Edit collection info</Trans>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <TextField
              label={t`Collection name`}
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
            />
            <TextField
              fullWidth
              label={t`Description`}
              multiline
              minRows={3}
              {...register('description', { maxLength: 2500 })}
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                <Trans>Description preview with markdown</Trans>
              </Typography>
              <MarkdownPreview control={control} />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={inProgress} onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button disabled={inProgress} type="submit" variant="contained">
            <Trans>Save changes</Trans>
            <ButtonProgress inProgress={inProgress} size={24} />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CollectionEditForm
