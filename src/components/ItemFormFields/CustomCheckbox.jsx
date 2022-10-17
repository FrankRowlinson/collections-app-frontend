import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'

function CustomCheckbox({ name, label, control }) {
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
      onChange={(e) => {
        onChange({ value: e.target.checked, type: 'BOOLEAN', label })
      }}
      control={<Checkbox {...field} />}
      label={label}
    />
  )
}

export default CustomCheckbox
