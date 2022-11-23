import { useTheme } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import { themeStore } from '../../../stores'
import { IconButton, Switch, ListItem } from '@mui/material'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

interface Props {
  variant: 'top' | 'drawer'
}

export const ThemeSwitcher = observer(function ({ variant }: Props) {
  const theme = useTheme()

  const TopVariant = () => (
    <IconButton sx={{ ml: 2 }} onClick={themeStore.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </IconButton>
  )

  const DrawerVariant = () => (
    <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
      <MdOutlineDarkMode />
      <Switch
        color="default"
        onChange={themeStore.toggleColorMode}
        checked={theme.palette.mode === 'dark'}
      />
      <MdDarkMode />
    </ListItem>
  )

  return <>{variant === 'drawer' ? <DrawerVariant /> : <TopVariant />}</>
})
