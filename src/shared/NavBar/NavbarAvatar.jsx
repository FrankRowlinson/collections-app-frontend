import { Avatar, IconButton } from '@mui/material'
import {
  usePopupState,
  bindMenu,
  bindHover,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import ProfileMenu from './ProfileMenu';

function NavbarAvatar() {
  const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' })

  return (
    <>
      <IconButton
        sx={{ display: { xs: 'none', lg: 'inline-block'} }}
        {...bindHover(popupState)}
      >
        <Avatar />
      </IconButton>
      <HoverMenu {...bindMenu(popupState)}>
        <ProfileMenu />
      </HoverMenu>
    </>
  )
}

export default NavbarAvatar