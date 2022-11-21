import { Trans } from '@lingui/macro'
import { Box, ListItemButton } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../constants'
import { LogoutButton } from '.'
import { UserContext } from '../../context'

export function ProfileMenu() {
  const { user } = useContext(UserContext)
  return (
    <Box width="100%">
      <ListItemButton
        sx={{ py: 1.5 }}
        component={Link}
        to={`${routes.USER_PROFILE}/${user?.id}`}
      >
        <Trans>Profile</Trans>
      </ListItemButton>
      <ListItemButton
        sx={{ py: 1.5 }}
        component={Link}
        to={`${routes.FAVOURITES}`}
        state={{ id: user?.id }}
      >
        <Trans>Favourites</Trans>
      </ListItemButton>
      <LogoutButton />
    </Box>
  )
}
