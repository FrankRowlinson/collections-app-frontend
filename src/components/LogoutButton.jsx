import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Button, ListItemButton, ListItemText } from '@mui/material'

function LogoutButton({ variant }) {
  const text = 'Logout'
  const { handleLogout } = useContext(UserContext)
  const topNavVariant = (
    <Button color="primary" variant="contained" sx={{color: 'primary.contrastText'}} onClick={handleLogout}>
      {text}
    </Button>
  )

  const drawerVariant = (
    <ListItemButton onClick={handleLogout}>
      <ListItemText>{text}</ListItemText>
    </ListItemButton>
  )

  const variants = {
    drawer: drawerVariant,
    topNav: topNavVariant
  }
  return (
    <>
      {variants[variant]}
    </>
  )
}

export default LogoutButton
