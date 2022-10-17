import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function TextInput({ name, label, control }) {
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

export default TextInput
