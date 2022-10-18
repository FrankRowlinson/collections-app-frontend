import React, { useContext, useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  MdSegment,
  MdSearch,
  MdDarkMode,
  MdOutlineDarkMode,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { getNavItems } from '../services/navigation'
import { UserContext } from '../context/UserContext'
import { ColorModeContext } from '../context/ColorModeContext'
import { useTheme } from '@mui/material/styles'
import NavBarItems from '../components/NavBarItems'
import routes from '../constants/routes'
import LogoutButton from './LogoutButton'
import SearchDialog from './SearchDialog'

const drawerWidth = '300px'

function NavBar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [navItems, setNavItems] = useState(getNavItems(user.role))
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  useEffect(() => {
    setNavItems(getNavItems(user.role))
  }, [user])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true)
  }

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false)
  }

  const ThemeToggler = () => (
    <IconButton sx={{ ml: 2 }} onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </IconButton>
  )

  const SearchButton = () => (
    <Button
      sx={{
        border: '1px solid',
        p: { xs: '5px 0', md: '5px 30px 5px 10px' },
        cursor: 'text',
      }}
      color="inherit"
      onClick={handleSearchDialogOpen}
      startIcon={<MdSearch />}
    >
      <Typography
        sx={{
          display: { md: 'block', xs: 'none' },
          textTransform: 'none',
          color: 'text.secondary',
        }}
      >
        Search...
      </Typography>
    </Button>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }} component={Link} to={routes.HOME}>
        COLLECTIONS
      </Typography>
      <Divider />
      <NavBarItems navItems={navItems} variant="drawer" />
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <SearchDialog
        open={searchDialogOpen}
        setOpen={setSearchDialogOpen}
        handleClose={handleSearchDialogClose}
      />
      <AppBar component="nav" color="transparent" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MdSegment />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to={routes.HOME}
            color="inherit"
            sx={{
              display: { xs: 'none', lg: 'block' },
              textDecoration: 'none',
              zIndex: 1
            }}
          >
            COLLECTIONS
          </Typography>
          {/* <Box flexGrow={1}></Box> */}
          <NavBarItems navItems={navItems} variant="topNavItems" />
          <Box flexGrow={1}></Box>
          <SearchButton />
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <ThemeToggler />
            {user.role === 'GUEST' ? '' : <LogoutButton variant="topNav" />}
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
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
