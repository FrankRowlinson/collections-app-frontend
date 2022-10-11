import React, { useContext, useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { MdSegment } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { getNavItems } from '../services/navigation'
import { UserContext } from '../context/UserContext'
import NavBarItems from '../components/NavBarItems'
import routes from '../constants/routes'

const drawerWidth = '300px'

function NavBar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(UserContext)
  const [navItems, setNavItems] = useState(getNavItems(user.role))

  useEffect(() => {
    setNavItems(getNavItems(user.role))
  }, [user])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        COLLECTIONS
      </Typography>
      <Divider />
      <NavBarItems navItems={navItems} variant="drawer" />
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="transparent" position="static">
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
              component={NavLink}
              to={routes.HOME}
              color="inherit"
              sx={{
                display: { xs: 'none', sm: 'block', textDecoration: 'none' },
              }}
            >
              COLLECTIONS
            </Typography>
            <Box flexGrow={1}></Box>
          <NavBarItems navItems={navItems} variant="topNavItems"/>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
