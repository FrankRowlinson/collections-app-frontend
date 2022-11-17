import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import { useContext } from 'react'
import { useController } from 'react-hook-form'
import { FormContext } from '../../../../../../context'

export function DateInput({ name, label }: FieldProps) {
  const { control } = useContext(FormContext)
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
