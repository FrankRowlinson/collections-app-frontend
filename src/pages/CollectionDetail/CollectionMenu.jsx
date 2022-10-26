import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { useConfirm } from 'material-ui-confirm'
import { BsThreeDotsVertical } from 'react-icons/bs'

const CollectionMenu = ({ rightToEdit }) => {
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
      .then(() => {})
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
