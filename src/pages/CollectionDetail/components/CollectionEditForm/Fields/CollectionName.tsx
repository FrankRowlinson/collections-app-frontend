import { TextField } from '@mui/material'
import { useContext } from 'react'
import { FormContext } from '../../../../../common/context'
import { t } from '@lingui/macro'

export function CollectionName() {
  const { register } = useContext(FormContext)
  return (
    <TextField
      label={t`Collection name`}
      {...register('name', {
        required: true,
        minLength: 3,
        maxLength: 100,
      })}
    />
  )
}
