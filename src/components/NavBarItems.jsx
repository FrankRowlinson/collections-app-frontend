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

const activeStyle = {
  backgroundColor: 'black',
  textDecoration: 'none',
  color: 'white',
}

const nonActiveStyle = {
  textDecoration: 'none',
  color: 'black',
}

function NavBarItems({ variant, navItems }) {
  const { user } = useContext(UserContext)

  const topNavItems = (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navItems.map(
        (item) =>
          item.show && (
            <Button
              component={NavLink}
              key={item.label}
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              variant="outlined"
              size="lg"
              sx={{ color: '#fff' }}
              to={item.route}
              end
            >
              {item.label}
            </Button>
          )
      )}
      {user.role === 'GUEST' ? '' : <LogoutButton variant="topNavVariant" />}
    </Box>
  )

  const drawerItems = (
    <List>
      {navItems.map((item) =>
        item.show ? (
          <ListItem key={item.label} disablePadding>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={item.route}
              end
            >
              <ListItemButton>
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
        ) : (
          ''
        )
      )}
      <ListItem key="logout" disablePadding>
        <LogoutButton variant="drawerVariant" />
      </ListItem>
    </List>
  )
  return (
    <>
      {variant === 'drawer'
        ? drawerItems
        : variant === 'topNavItems' && topNavItems}
    </>
  )
}

export default NavBarItems
