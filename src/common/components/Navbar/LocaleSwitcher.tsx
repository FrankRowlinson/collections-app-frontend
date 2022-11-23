import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import {
  IconButton,
  Menu,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  ListItem,
} from '@mui/material'
import { useEffect } from 'react'
import { locales } from '../../constants'
import { localeStore } from '../../../stores/localeStore'
import { observer } from 'mobx-react-lite'

interface Props {
  variant: 'drawer' | 'top'
}

interface Locale {
  [key: string]: string
}

const localeMapping: Locale = {}

export const LocaleSwitcher = observer(function ({ variant }: Props) {
  useEffect(() => {
    locales.forEach((el) => (localeMapping[el.name] = el.flag))
  }, [])

  const TopVariant = () => {
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
          {localeMapping[localeStore.locale]}
        </IconButton>
        <Menu {...bindMenu(popupState)}>
          {locales.map((item) => {
            return (
              <MenuItem
                key={`${item.name}-top`}
                onClick={() => {
                  localeStore.changeLocale(item.name)
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

  const DrawerVariant = () => {
    return (
      <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup>
          {locales.map((item) => (
            <ToggleButton
              size="small"
              value={item.name}
              selected={item.name === localeStore.locale}
              key={`${item.name}-drawer`}
              sx={{ fontSize: 20, py: 0, px: 2 }}
              onClick={() => {
                localeStore.changeLocale(item.name)
              }}
            >
              {item.flag}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ListItem>
    )
  }

  return <>{variant === 'drawer' ? <DrawerVariant /> : <TopVariant />}</>
})
