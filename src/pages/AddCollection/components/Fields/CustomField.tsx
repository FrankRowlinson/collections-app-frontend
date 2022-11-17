import {
  FormControl,
  Select,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material'
import { t } from '@lingui/macro'
import { useContext } from 'react'
import { FormContext } from '../../../../context'

interface FieldType {
  value: string
  label: string
}

interface Props {
  index: number
  fieldTypes: FieldType[]
}

export function CustomField({ index, fieldTypes }: Props) {
  const { register } = useContext(FormContext)
  return (
    <>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id={`customField.${index}.label`}>
            {t`Field Type`}
          </InputLabel>
          <Select
            labelId={`customField.${index}.label`}
            label={t`Field Type`}
            defaultValue=""
            {...register?.(`customField.${index}.type`, {
              required: true,
            })}
          >
            {fieldTypes.map((el, key) => (
              <MenuItem value={el.value} key={`${el}-${key}`}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          autoComplete="off"
          label={t`Field name`}
          {...register?.(`customField.${index}.name`, {
            required: true,
            minLength: 3,
            maxLength: 75,
          })}
        />
      </Grid>
    </>
  )
}
