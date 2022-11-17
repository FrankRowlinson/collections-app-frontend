import { TextField } from '@mui/material'
import { useContext } from 'react'
import { FormContext } from '../../../../../context'
import { t } from '@lingui/macro'

export function CollectionDescription() {
  const { register } = useContext(FormContext)
  return (
    <TextField
      fullWidth
      label={t`Description`}
      multiline
      minRows={3}
      {...register('description', { maxLength: 2500 })}
    />
  )
}
