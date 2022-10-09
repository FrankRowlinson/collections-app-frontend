import React, { useContext } from 'react'
import {
  Box,
  List,
  Button,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import { UserContext } from '../context/UserContext'

function NavBarItems({ variant, navItems }) {
  const { user } = useContext(UserContext)

  const topNavItems = (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navItems.map(
        (item) =>
          item.show && (
            <NavLink
              to={item.route}
              key={item.label}
              end
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation={isActive}
                  sx={{
                    color: isActive ? 'primary.light' : 'primary.contrastText',
                    mr: 2,
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          )
      )}
      {user.role === 'GUEST' ? '' : <LogoutButton variant="topNav" />}
    </Box>
  )

  const drawerItems = (
    <List>
      {navItems.map((item) =>
        item.show ? (
          <ListItem key={item.label} disablePadding>
            <NavLink
              style={{ width: '100%', textDecoration: 'none' }}
              to={item.route}
              end
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{ color: 'text.primary' }}
                  selected={isActive}
                >
                  <ListItemText>{item.label}</ListItemText>
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ) : (
          ''
        )
      )}
      <ListItem key="logout" disablePadding>
        {user.role === 'GUEST' ? '' : <LogoutButton variant="drawer" />}
      </ListItem>
    </List>
  )

  const variants = {
    drawer: drawerItems,
    topNavItems: topNavItems,
  }
  return <>{variants[variant]}</>
}

export default NavBarItems
