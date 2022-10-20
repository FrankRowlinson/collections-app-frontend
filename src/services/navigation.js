import routes from "../constants/routes"

export function getNavItems (role) {
  const navItems = [
    {
      label: 'Home',
      route: routes.HOME,
      show: true
    },
    {
      label: 'Login',
      route: routes.LOGIN,
      show: role === 'GUEST'
    },
    {
      label: 'Sign Up',
      route: routes.SIGNUP,
      show: role === 'GUEST'
    },
    {
      label: 'Create Collection',
      route: routes.CREATE_COLLECTION,
      show: role !== 'GUEST'
    },
  ]
  return navItems
}