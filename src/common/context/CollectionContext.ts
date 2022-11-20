import { createContext } from 'react'

interface CollectionContextInterface {
  rightToEdit?: boolean
  collection?: any
  refetch?: () => void
  defaultValues?: {
    name: string
    description: string
  }
}

export const CollectionContext = createContext<CollectionContextInterface>({})
