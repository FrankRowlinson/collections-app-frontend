import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ListItemButton } from '@mui/material'
import { Trans } from '@lingui/macro'

function LogoutButton() {
  const { handleLogout } = useContext(UserContext)
  return <ListItemButton sx={{ py: 1.5 }} onClick={handleLogout}><Trans>Logout</Trans></ListItemButton>
}

export default LogoutButton
