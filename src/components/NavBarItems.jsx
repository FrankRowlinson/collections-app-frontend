import React, { useContext } from 'react'
import {
  Box,
  List,
  Switch,
  Button,
  ListItem,
  IconButton,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import { UserContext } from '../context/UserContext'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../context/ColorModeContext'

function NavBarItems({ variant, navItems }) {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
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
                  variant={theme.palette.mode === 'dark' ? 'text' : 'contained'}
                  color="inherit"
                  disableElevation={isActive}
                  sx={{
                    color: isActive ? 'text.primary' : 'text.secondary',
                    textUnderlineOffset: '5px',
                    textDecoration: isActive ? 'underline' : 'none',
                    borderRadius: 0,
                    backgroundColor: 'background.default',
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          )
      )}
      <IconButton sx={{ ml: 2 }} onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <MdDarkMode /> : <MdOutlineDarkMode />}
      </IconButton>
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
      <ListItem
        disablePadding
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <MdOutlineDarkMode />
        <Switch
          color="default"
          onChange={colorMode.toggleColorMode}
          checked={theme.palette.mode === 'dark'}
        />
        <MdDarkMode />
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
