import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { ColorModeContext } from '../../context'
import { IconButton, Switch, ListItem } from '@mui/material'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

interface Props {
  variant: 'top' | 'drawer'
}

export function ThemeSwitcher({ variant }: Props) {
  const colorMode = useContext(ColorModeContext)
  const theme = useTheme()

  const TopVariant = () => (
    <IconButton sx={{ ml: 2 }} onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </IconButton>
  )

  const DrawerVariant = () => (
    <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
      <MdOutlineDarkMode />
      <Switch
        color="default"
        onChange={colorMode.toggleColorMode}
        checked={theme.palette.mode === 'dark'}
      />
      <MdDarkMode />
    </ListItem>
  )

  return <>{variant === 'drawer' ? <DrawerVariant /> : <TopVariant />}</>
}
