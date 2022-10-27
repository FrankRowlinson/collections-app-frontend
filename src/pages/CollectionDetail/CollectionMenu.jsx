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

const CollectionMenu = ({ rightToEdit, id }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'collection-menu',
  })
  const onDelete = () => {
    confirm({
      description:
        'This action is irreversible! Are you sure you want to delete this collection?',
    })
      .then(async () => {
        const response = await deleteCollection(id)
        if (response.status === 'ok') {
          enqueueSnackbar('Collection successfully deleted', {
            variant: 'success',
          })
          navigate(routes.HOME)
        }
      })
      .catch(() => {})
  }

  const onEdit = () => {}

  return (
    <Box sx={{ display: rightToEdit ? 'block' : 'none' }}>
      <IconButton {...bindTrigger(popupState)}>
        <BsThreeDotsVertical />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={onEdit}>Edit</MenuItem>
        <MenuItem onClick={onDelete}>Delete collection</MenuItem>
      </Menu>
    </Box>
  )
}

export default CollectionMenu
