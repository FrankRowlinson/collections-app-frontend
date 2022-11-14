import { Grid, TextField } from '@mui/material'
import { t } from '@lingui/macro'
import { useContext } from 'react'
import { FormContext } from '../../../../../context'

function ItemName() {
  const { register, errors } = useContext(FormContext)
  return (
    <Grid item xs={12} sm={8} md={6}>
      <TextField
        fullWidth
        error={Boolean(errors.itemName)}
        helperText={errors.itemName && errors.itemName.message}
        label={t`Item name`}
        {...register('itemName', {
          required: t`Item name is required`,
          maxLength: {
            value: 50,
            message: t`Maximum length of name is 50`,
          },
        })}
      />
    </Grid>
  )
}

export default ItemName
