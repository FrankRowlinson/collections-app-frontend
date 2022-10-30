import { ListItemButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import routes from '../../constants/routes'
import { Trans } from '@lingui/macro'

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
