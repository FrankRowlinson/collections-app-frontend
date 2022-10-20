import { Avatar, IconButton, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  usePopupState,
  bindMenu,
  bindHover,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import LogoutButton from './LogoutButton'
import routes from '../constants/routes'

function ProfileMenu() {
  const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' })

  return (
    <>
      <IconButton
        sx={{ display: { xs: 'none', lg: 'inline-block' } }}
        {...bindHover(popupState)}
      >
        <Avatar />
      </IconButton>
      <HoverMenu {...bindMenu(popupState)}>
        <MenuItem component={Link} to={routes.USER_PROFILE}>
          Profile
        </MenuItem>
        <LogoutButton />
      </HoverMenu>
    </>
  )
}

export default ProfileMenu
