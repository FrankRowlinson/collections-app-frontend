import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CollectionContext, FormContext } from '../../../../common/context'
import { Trans, t } from '@lingui/macro'
import { editCollection } from '../../../../common/services'
import { useSnackbar } from 'notistack'
import { ButtonProgress } from '../../../../common/components'
import { CollectionDescription, CollectionName, DescriptionPreview } from '.'

interface Props {
  collectionId: string
  open: boolean
  setEditFormOpen: (open: boolean) => void
}

export function CollectionEditForm({
  collectionId,
  open,
  setEditFormOpen,
}: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [inProgress, setInProgress] = useState(false)
  const { defaultValues, refetch } = useContext(CollectionContext)
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues,
  })
  const handleClose = () => {
    reset()
    setEditFormOpen(false)
  }
  const onSubmit = async (data: any) => {
    setInProgress(true)
    if (
      data.name === defaultValues?.name &&
      data.description === defaultValues?.description
    ) {
      enqueueSnackbar(t`You haven't made any changes`, { variant: 'warning' })
    } else {
      const response = await editCollection(collectionId, data)
      if (response.status === 'ok') {
        enqueueSnackbar('Collection info successfully edited', {
          variant: 'success',
        })
        refetch?.()
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
    <FormContext.Provider value={{ register, control }}>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          <Trans>Edit collection info</Trans>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              <CollectionName />
              <CollectionDescription />
              <DescriptionPreview />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button disabled={inProgress} onClick={handleClose}>
              <Trans>Cancel</Trans>
            </Button>
            <Button disabled={inProgress} type="submit" variant="contained">
              <Trans>Save changes</Trans>
              <ButtonProgress inProgress={inProgress} />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormContext.Provider>
  )
}
