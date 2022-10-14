import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function Textarea({ name, control }) {
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: '', type: 'TEXT' },
  })
  return (
    <TextField
      value={value.value}
      onChange={(e) => {
        onChange({ value: e.target.value, type: 'TEXT' })
      }}
      {...field}
      fullWidth
      multiline
      minRows={3}
      label={name}
    />
  )
}

export default Textarea
