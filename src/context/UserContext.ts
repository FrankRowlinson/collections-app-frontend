import { createContext } from 'react'

interface UserContextInterface {
  user?: User
  setUser?: (user: User) => void
  handleLogout?: () => void
}

export const UserContext = createContext<UserContextInterface>({})
