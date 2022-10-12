import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function Text({ name, control }) {
  const { field } = useController({ name, control, defaultValue: '' })

  return <TextField {...field} label={name} fullWidth />
}

export default Text
