import { Box, Drawer, Divider } from '@mui/material'
import { NavbarItems, NavbarLogo } from '.'

const drawerWidth = '300px'

interface Props {
  handleDrawerToggle: () => void
  mobileOpen: boolean
  navItems: NavItem[]
}

export function NavbarDrawer({
  handleDrawerToggle,
  mobileOpen,
  navItems,
}: Props) {
  const container =
    window !== undefined ? () => window.document.body : undefined

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
      <Box
        onClick={handleDrawerToggle}
        sx={{ textAlign: 'center', height: '100%' }}
      >
        <NavbarLogo variant="drawer" />
        <Divider />
        <NavbarItems navItems={navItems} variant="drawer" />
      </Box>
    </Drawer>
  )
}
