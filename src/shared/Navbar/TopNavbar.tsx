import { Toolbar, IconButton, Box } from '@mui/material'
import {
  NavbarAvatar,
  NavbarItems,
  SearchButton,
  ThemeSwitcher,
  LocaleSwitcher,
  NavbarLogo,
} from '.'
import { t } from '@lingui/macro'
import { MdSegment } from 'react-icons/md'
import { UserContext } from '../../context'
import { useContext } from 'react'

interface Props {
  navItems: NavItem[]
  handleDrawerToggle: () => void
}

export function TopNavbar({ navItems, handleDrawerToggle }: Props) {
  const { user } = useContext(UserContext)
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label={t`open drawer`}
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { lg: 'none' } }}
      >
        <MdSegment />
      </IconButton>
      <NavbarLogo variant="top" />
      <NavbarItems navItems={navItems} variant="top" />
      <Box flexGrow={1}></Box>
      <SearchButton />
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <ThemeSwitcher variant="top" />
        <LocaleSwitcher variant="top" />
        {user?.role === 'GUEST' ? '' : <NavbarAvatar />}
      </Box>
    </Toolbar>
  )
}
