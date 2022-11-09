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
import { useContext, useEffect } from 'react'
import { LocaleContext } from '../../context'
import { locales } from '../../constants'

const localeMapping = {}

function LocaleSwitcher({ variant }) {
  const { localeMode, locale } = useContext(LocaleContext)

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

  const DrawerVariant = () => {
    return (
      <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup>
          {locales.map((item, index) => (
            <ToggleButton
              size="small"
              value={item.name}
              selected={item.name === locale}
              key={`${item.name}-drawer`}
              sx={{ fontSize: 20, py: 0, px: 2 }}
              onClick={() => {
                localeMode.changeLocale(item.name)
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
}

export default LocaleSwitcher
