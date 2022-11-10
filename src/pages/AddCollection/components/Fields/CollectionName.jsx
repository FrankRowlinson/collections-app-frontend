import { useContext } from 'react'
import { Grid, TextField } from '@mui/material'
import { AddCollectionFormContext } from '../../../../context'
import { t } from '@lingui/macro'

function CollectionName() {
  const { register, errors } = useContext(AddCollectionFormContext)
  return (
    <Grid item xs={12}>
      <TextField
        {...register('collectionName', {
          required: true,
          minLength: 3,
          maxLength: 100,
        })}
        id="collection-name"
        label={t`Collection name`}
        autoComplete="off"
        error={!!errors.collectionName}
        helperText={errors.collectionName ? errors.collectionName.message : ''}
        fullWidth
      />
    </Grid>
  )
}

export default CollectionName