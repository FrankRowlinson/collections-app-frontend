import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context'
import { ThemeSwitcher, LocaleSwitcher, ProfileMenu } from './'

function NavBarItems({ variant, navItems }) {
  const theme = useTheme()
  const { user } = useContext(UserContext)

  const topNavItems = (
    <Box
      sx={{
        display: { xs: 'none', lg: 'block' },
        ml: 5,
      }}
    >
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
    </Box>
  )

  const drawerItems = (
    <List>
      {navItems.map(
        (item) =>
          item.show && (
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
          )
      )}
      <ListItem key="logout" disablePadding>
        {user.role === 'GUEST' ? '' : <ProfileMenu />}
      </ListItem>
      <LocaleSwitcher variant="drawer" />
      <ThemeSwitcher variant="drawer" />
    </List>
  )

  const variants = {
    drawer: drawerItems,
    topNavItems: topNavItems,
  }

  return <>{variants[variant]}</>
}

export default NavBarItems
