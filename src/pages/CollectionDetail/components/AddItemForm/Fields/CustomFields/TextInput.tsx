import { TextField } from '@mui/material'
import { useContext } from 'react'
import { useController } from 'react-hook-form'
import { FormContext } from '../../../../../../common/context'

export function TextInput({ name, label }: FieldProps) {
  const { control } = useContext(FormContext)
  const {
    field: { onChange, value, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: '', type: 'STRING', label },
  })

  return (
    <TextField
      value={value.value}
      onChange={(e) => {
        onChange({ value: e.target.value, type: 'STRING', label })
      }}
      {...field}
      label={label}
      fullWidth
    />
  )
}
