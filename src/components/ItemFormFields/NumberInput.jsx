import { FormControl, InputLabel, Input } from '@mui/material'
import { useController } from 'react-hook-form'

function Number({ name, control }) {
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: '', type: 'NUMBER' },
    rules: {
      validate: {
        less_than: (value) => value.value > -2147483648,
        more_than: (value) => value.value < 2147483647
      }
    },
  })
  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-number-field`}>{name}</InputLabel>
      <Input
        value={value.value}
        onChange={(e) => {
          onChange({ value: e.target.value, type: 'NUMBER' })
        }}
        {...field}
        label={name}
        type="number"
      />
    </FormControl>
  )
}

export default Number
