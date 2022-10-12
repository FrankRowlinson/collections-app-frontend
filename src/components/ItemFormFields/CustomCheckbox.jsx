import { FormControlLabel, Checkbox, Alert } from '@mui/material'
import { useController } from 'react-hook-form'

function CustomCheckbox({ name, control }) {
  const { field } = useController({ name, control, defaultValue: '' })

  return <FormControlLabel control={<Checkbox {...field} />} label={name} />
}

export default CustomCheckbox
