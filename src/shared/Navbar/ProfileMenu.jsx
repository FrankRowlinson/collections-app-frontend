import { Trans } from '@lingui/macro'
import { Box, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { routes } from '../../constants'
import { LogoutButton } from './'

function ProfileMenu() {
  return (
    <Box width="100%">
      <ListItemButton
        sx={{ py: 1.5 }}
        component={Link}
        to={routes.USER_PROFILE}
      >
        <Trans>Profile</Trans>
      </ListItemButton>
      <LogoutButton />
    </Box>
  )
}

export default ProfileMenu
