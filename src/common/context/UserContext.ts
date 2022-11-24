import { createContext } from 'react'

interface UserContextInterface {
  user?: User
  refetch?: () => void
  handleLogout?: () => void
}

export const UserContext = createContext<UserContextInterface>({})
