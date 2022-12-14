import { t, Trans } from '@lingui/macro'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { useSnackbar } from 'notistack'
import { useContext } from 'react'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../common/constants'
import { CollectionContext } from '../../../common/context'
import { deleteCollection } from '../../../common/services'
import { CollectionEditForm } from '.'

export const CollectionMenu = () => {
  const { collection, rightToEdit } = useContext(CollectionContext)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const [editFormOpen, setEditFormOpen] = useState(false)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'collection-menu',
  })
  const onDelete = () => {
    popupState.close()
    confirm({
      description: t`This action is irreversible! Are you sure you want to delete this collection?`,
    })
      .then(async () => {
        const response = await deleteCollection(collection.id)
        if (response.status === 'ok') {
          enqueueSnackbar(t`Collection successfully deleted`, {
            variant: 'success',
          })
          navigate(routes.HOME)
        }
      })
      .catch(() => {})
  }

  const onEdit = () => {
    popupState.close()
    setEditFormOpen(true)
  }

  return (
    <Box sx={{ display: rightToEdit ? 'block' : 'none' }}>
      <CollectionEditForm
        open={editFormOpen}
        setEditFormOpen={setEditFormOpen}
        collectionId={collection.id}
      />
      <IconButton {...bindTrigger(popupState)} size="small">
        <BsThreeDotsVertical />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={onEdit}>
          <Trans>Edit</Trans>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <Trans>Delete collection</Trans>
        </MenuItem>
      </Menu>
    </Box>
  )
}
