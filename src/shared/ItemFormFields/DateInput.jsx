import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import { useController } from 'react-hook-form'

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
    <DesktopDatePicker
      label={label}
      value={value.value}
      {...field}
      onChange={(newValue) => {
        onChange({
          value: moment(new Date(newValue)).format('yyyy-MM-DD'),
          type: 'DATE',
          label,
        })
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

export default DateInput
