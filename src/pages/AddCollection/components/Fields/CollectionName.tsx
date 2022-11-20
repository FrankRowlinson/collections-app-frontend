import { useContext } from 'react'
import { Grid, TextField } from '@mui/material'
import { FormContext } from '../../../../common/context'
import { t } from '@lingui/macro'

export function CollectionName() {
  const { register, errors } = useContext(FormContext)
  return (
    <Grid item xs={12}>
      <TextField
        {...register?.('collectionName', {
          required: true,
          minLength: 3,
          maxLength: 100,
        })}
        id="collection-name"
        label={t`Collection name`}
        autoComplete="off"
        error={!!errors?.collectionName}
        helperText={errors?.collectionName ? errors?.collectionName.message : ''}
        fullWidth
      />
    </Grid>
  )
}
