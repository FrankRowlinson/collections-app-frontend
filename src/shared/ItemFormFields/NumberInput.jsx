import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'
import { useState } from 'react'
import { t } from '@lingui/macro'

function NumberInput({ name, label, control }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: { value: 0, type: 'NUMBER', label },
    rules: {
      validate: {
        less: (v) => v.value < 150_000_000,
        more: (v) => v.value > -150_000_000,
      },
    },
  })
  const [value, setValue] = useState(field.value.value)
  return (
    <>
      <TextField
        ref={field.ref}
        value={value}
        onChange={(e) => {
          field.onChange({ value: e.target.value, type: 'NUMBER', label })
          setValue(e.target.value)
        }}
        onBlur={field.onBlur}
        type="number"
        label={label}
        error={!!error}
        helperText={t`Number must be of a reasonable size`}
      />
    </>
  )
}

export default NumberInput
