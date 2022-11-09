import { Box, Drawer, Divider } from '@mui/material'
import { NavbarItems, NavbarLogo } from './'

const drawerWidth = '300px'

function NavbarDrawer({ handleDrawerToggle, window, mobileOpen, navItems }) {
  const container =
    window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', height: '100%' }}
    >
      <NavbarLogo variant="drawer" />
      <Divider />
      <NavbarItems navItems={navItems} variant="drawer" />
    </Box>
  )
  return (
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
  )
}

export default NavbarDrawer
