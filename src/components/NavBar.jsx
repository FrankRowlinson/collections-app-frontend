import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'
import routes from '../constants/routes'
import { MdSegment } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    label: 'Home',
    route: routes.HOME,
  },
  {
    label: 'Login',
    route: routes.LOGIN,
  },
  {
    label: 'Sign Up',
    route: routes.SIGNUP,
  },
  {
    label: 'Create Collection',
    route: routes.CREATE_COLLECTION
  }
]

const drawerWidth = '300px'

function NavBar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeStyle = {
    backgroundColor: 'black',
    textDecoration: 'none',
  }

  const nonActiveStyle = {
    textDecoration: 'none',
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink
                style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }
                to={item.route}
                end
              >
                <ListItemText>{item.label}</ListItemText>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MdSegment />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                component={NavLink}
                key={item.label}
                style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }
                variant="outlined"
                size='lg'
                sx={{ color: '#fff' }}
                to={item.route}
                end
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default NavBar
