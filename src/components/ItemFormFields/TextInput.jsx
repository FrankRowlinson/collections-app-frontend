import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function Text({ name, control }) {
  const {
    field: { onChange, value, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: '', type: 'STRING' },
  })

  return (
    <TextField
      value={value.value}
      onChange={(e) => {
        onChange({ value: e.target.value, type: 'STRING' })
      }}
      {...field}
      label={name}
      fullWidth
    />
  )
}

export default Text
