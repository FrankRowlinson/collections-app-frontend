import { useContext } from 'react'
import { Grid } from '@mui/material'
import {
  CustomCheckbox,
  DateInput,
  NumberInput,
  TextareaInput,
  TextInput,
} from './Fields/CustomFields'
import { FormContext } from '../../../../context'
import { customFieldTypes } from '../../../../constants'

const fieldMapping: Mapping = {
  number: NumberInput,
  text: TextInput,
  textarea: TextareaInput,
  date: DateInput,
  checkbox: CustomCheckbox,
}

export function CustomItemFields() {
  const { data } = useContext(FormContext)
  return (
    <>
      {data.fields.map((field: ItemFieldDef, index: number) => {
        const { id, name: label, type } = field
        const InputElement = fieldMapping[customFieldTypes[type].type]
        return (
          <Grid
            key={id}
            item
            xs={12}
            sm={type === 'DATE' ? 4 : type === 'NUMBER' ? 4 : 12}
            md={type === 'DATE' ? 6 : type === 'NUMBER' ? 6 : 12}
          >
            <InputElement label={label} name={`${type}Field${index}`} />
          </Grid>
        )
      })}
    </>
  )
}
