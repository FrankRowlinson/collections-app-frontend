import { FormControl, InputLabel, Input } from '@mui/material'
import { useController } from 'react-hook-form'

function Number({ name, control }) {
  const { field } = useController({ name, control, defaultValue: '' })
  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-number-field`}>{name}</InputLabel>
      <Input
        {...field}
        label={name}
        type="number"
      />
    </FormControl>
  )
}

export default Number
