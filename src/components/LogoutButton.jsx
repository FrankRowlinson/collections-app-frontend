import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { ListItemButton } from '@mui/material'

function LogoutButton() {
  const text = 'Logout'
  const { handleLogout } = useContext(UserContext)
  return <ListItemButton onClick={handleLogout}>{text}</ListItemButton>
}

export default LogoutButton
