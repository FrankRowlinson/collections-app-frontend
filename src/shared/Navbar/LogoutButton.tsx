import { Trans } from '@lingui/macro'
import { ListItemButton } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context'

export function LogoutButton() {
  const { handleLogout } = useContext(UserContext)
  return (
    <ListItemButton sx={{ py: 1.5 }} onClick={handleLogout}>
      <Trans>Logout</Trans>
    </ListItemButton>
  )
}
