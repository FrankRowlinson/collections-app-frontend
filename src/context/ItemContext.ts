import { createContext } from 'react'

interface ItemContextInterface {
  itemId: string
}

export const ItemContext = createContext<ItemContextInterface>({ itemId: '' })
