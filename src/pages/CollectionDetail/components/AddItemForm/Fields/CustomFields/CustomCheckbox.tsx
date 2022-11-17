import { Checkbox, FormControlLabel } from '@mui/material'
import { useContext } from 'react'
import { useController } from 'react-hook-form'
import { FormContext } from '../../../../../../context'

export function CustomCheckbox({ name, label }: FieldProps) {
  const { control } = useContext(FormContext)
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: false, type: 'BOOLEAN', label },
  })

  return (
    <FormControlLabel
      checked={value.value}
      onChange={(e, checked: boolean) => {
        onChange({ value: checked, type: 'BOOLEAN', label })
      }}
      control={<Checkbox {...field} />}
      label={label}
    />
  )
}
