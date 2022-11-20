import { createContext } from 'react'

interface FormContextInterface {
  register?: any
  control?: any
  resetField?: any
  errors?: any
  isLoading?: boolean
  data?: any
}

export const FormContext = createContext<FormContextInterface>({})
