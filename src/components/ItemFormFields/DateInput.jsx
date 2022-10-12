import { FormControl, InputLabel, Input } from '@mui/material'
import { useController } from 'react-hook-form'
import moment from 'moment'

function DateInput({ name, control }) {
  const { field } = useController({
    name,
    control,
    defaultValue: moment(Date.now()).format('yyyy-MM-DD'),
  })

  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-date-field`}>{name}</InputLabel>
      <Input
      
        {...field}
        label={name}
        placeholder=""
        type="date"
      />
    </FormControl>
  )
}

export default DateInput
