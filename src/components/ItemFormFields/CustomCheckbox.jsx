import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'

function CustomCheckbox({ name, control }) {
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: { value: false, type: 'BOOLEAN' },
  })

  return (
    <FormControlLabel
      checked={value.value}
      onChange={(e) => {
        onChange({ value: e.target.checked, type: 'BOOLEAN' })
      }}
      control={<Checkbox {...field} />}
      label={name}
    />
  )
}

export default CustomCheckbox
