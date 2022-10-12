import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function Textarea({ name, control }) {
  const { field } = useController({ name, control, defaultValue: '' })
  return <TextField {...field} fullWidth multiline minRows={3} label={name} />
}

export default Textarea
