import { placeholderUrl } from '../constants'

export const usePlaceholder = (text: string): string => {
  return placeholderUrl + text
}
