import { t, Trans } from '@lingui/macro'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { useContext, useEffect, useState } from 'react'
import {
  MdDarkMode,
  MdOutlineDarkMode,
  MdSearch,
  MdSegment,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { routes, locales } from '../../constants'
import { LocaleContext, ColorModeContext, UserContext } from '../../context'
import { getNavItems } from '../../services/navigation'
import { NavbarAvatar, NavbarItems, SearchDialog } from './'

const drawerWidth = '300px'
const localeMapping = {}

function Navbar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { localeMode, locale } = useContext(LocaleContext)
  const [navItems, setNavItems] = useState(getNavItems(user.role))
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  useEffect(() => {
    setNavItems(getNavItems(user.role))
  }, [user])

  useEffect(() => {
    locales.forEach((el) => (localeMapping[el.name] = el.flag))
  }, [])

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

  const LocaleSwitcher = () => {
    const popupState = usePopupState({
      variant: 'popover',
      popupId: 'localeMenu',
    })
    return (
      <>
        <IconButton
          {...bindTrigger(popupState)}
          sx={{ color: 'text.primary', mx: 0.5, fontSize: 20 }}
        >
          {localeMapping[locale]}
        </IconButton>
        <Menu {...bindMenu(popupState)}>
          {locales.map((item) => {
            return (
              <MenuItem
                key={`${locale.name}-top`}
                onClick={() => {
                  localeMode.changeLocale(item.name)
                }}
              >
                {item.flag}
              </MenuItem>
            )
          })}
        </Menu>
      </>
    )
  }

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
        <Trans>Search...</Trans>
      </Typography>
    </Button>
  )

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', height: '100%' }}
    >
      <Typography
        variant="h6"
        color="inherit"
        sx={{ display: 'block', my: 3, textDecoration: 'none' }}
        component={Link}
        to={routes.HOME}
      >
        COLLECTIONS
      </Typography>
      <Divider />
      <NavbarItems navItems={navItems} variant="drawer" />
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
            aria-label={t`open drawer`}
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
              zIndex: 1,
            }}
          >
            COLLECTIONS
          </Typography>
          <NavbarItems navItems={navItems} variant="topNavItems" />
          <Box flexGrow={1}></Box>
          <SearchButton />
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <ThemeToggler />
            <LocaleSwitcher />
            {user.role === 'GUEST' ? '' : <NavbarAvatar />}
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

export default Navbar
