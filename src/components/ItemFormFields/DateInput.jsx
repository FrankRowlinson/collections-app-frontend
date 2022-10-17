import { FormControl, InputLabel, Input } from '@mui/material'
import { useController } from 'react-hook-form'
import moment from 'moment'

function DateInput({ name, label, control }) {
  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: {
      value: moment(Date.now()).format('yyyy-MM-DD'),
      type: 'DATE',
      label,
    },
    rules: {
      valueAsDate: true,
    },
  })

  return (
    <FormControl fullWidth>
      <InputLabel id={`custom-date-field`}>{label}</InputLabel>
      <Input
        value={value.value}
        onChange={(e) => {
          onChange({ value: new Date(e.target.value), type: 'DATE', label })
        }}
        {...field}
        label={label}
        placeholder=""
        type="date"
      />
    </FormControl>
  )
}

export default DateInput
