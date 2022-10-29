import { useState } from 'react'
import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { useConfirm } from 'material-ui-confirm'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { deleteCollection } from '../../services/manageCollection'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'
import { useSnackbar } from 'notistack'
import { t, Trans } from '@lingui/macro'
import CollectionEditForm from './CollectionEditForm'

const CollectionMenu = ({ rightToEdit, id }) => {
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
        const response = await deleteCollection(id)
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
        collectionId={id}
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

export default CollectionMenu
