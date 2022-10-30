import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function TextareaInput({ name, label, control }) {
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

export default TextareaInput
