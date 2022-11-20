import { Avatar, IconButton } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import { ProfileMenu } from '.'

export function NavbarAvatar() {
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
        <ProfileMenu />
      </HoverMenu>
    </>
  )
}
