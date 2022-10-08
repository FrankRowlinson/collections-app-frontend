import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Button, ListItemButton, ListItemText } from '@mui/material'

function LogoutButton({ type }) {
  const text = 'Logout'
  const { handleLogout } = useContext(UserContext)
  const topNavVariant = (
    <Button color="inherit" onClick={handleLogout}>
      {text}
    </Button>
  )

  const drawerVariant = (
    <ListItemButton onClick={handleLogout}>
      <ListItemText>{text}</ListItemText>
    </ListItemButton>
  )
  return (
    <>
      {type === 'drawerVariant'
        ? drawerVariant
        : type === 'topNavVariant' && topNavVariant}
    </>
  )
}

export default LogoutButton
