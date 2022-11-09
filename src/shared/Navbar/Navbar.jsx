import { AppBar, Box } from '@mui/material'
import { useContext, useEffect, useState, useCallback } from 'react'
import { UserContext } from '../../context'
import { getNavItems } from '../../services/navigation'
import { TopNavbar, NavbarDrawer } from './'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(UserContext)
  const [navItems, setNavItems] = useState(getNavItems(user.role))

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  useEffect(() => {
    setNavItems(getNavItems(user.role))
  }, [user])

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppBar component="nav" color="transparent" position="static">
        <TopNavbar
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
        />
      </AppBar>
      <Box component="nav">
        <NavbarDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
        />
      </Box>
    </Box>
  )
}

export default Navbar
