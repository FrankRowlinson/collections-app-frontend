import { TextField } from '@mui/material'
import { useContext } from 'react'
import { useController } from 'react-hook-form'
import { FormContext } from '../../../../../../context'

export function TextareaInput({ name, label }: FieldProps) {
  const { control } = useContext(FormContext)
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: '', type: 'TEXT', label },
  })
  return (
    <TextField
      value={value.value}
      onChange={(e) => {
        onChange({ value: e.target.value, type: 'TEXT', label })
      }}
      {...field}
      fullWidth
      multiline
      minRows={3}
      label={label}
    />
  )
}
