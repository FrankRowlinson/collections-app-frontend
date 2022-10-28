import { t } from '@lingui/macro'
import routes from '../constants/routes'

export function getNavItems(role) {
  const navItems = [
    {
      label: t`Home`,
      route: routes.HOME,
      show: true,
    },
    {
      label: t`Login`,
      route: routes.LOGIN,
      show: role === 'GUEST',
    },
    {
      label: t`Sign Up`,
      route: routes.SIGNUP,
      show: role === 'GUEST',
    },
    {
      label: t`Create Collection`,
      route: routes.CREATE_COLLECTION,
      show: role !== 'GUEST',
    },
  ]
  return navItems
}
