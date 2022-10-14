import { FormControl, InputLabel, Input } from '@mui/material'
import { useController } from 'react-hook-form'
import moment from 'moment'

function DateInput({ name, control }) {
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: {
      value: moment(Date.now()).format('yyyy-MM-DD'),
      type: 'DATE',
    },
    rules: {
      valueAsDate: true,
    },
  })

  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-date-field`}>{name}</InputLabel>
      <Input
        value={value.value}
        onChange={(e) => {
          onChange({ value: new Date(e.target.value), type: 'DATE' })
        }}
        {...field}
        label={name}
        placeholder=""
        type="date"
      />
    </FormControl>
  )
}

export default DateInput
