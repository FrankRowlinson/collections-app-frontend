import { useContext } from 'react'
import { FormContext } from '../../../../common/context'
import { Grid, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { Trans, t } from '@lingui/macro'

export function CollectionType() {
  const { register, errors, isLoading, data } = useContext(
    FormContext
  )
  return (
    <Grid item xs={12}>
      <FormControl sx={{ maxWidth: '300px' }} fullWidth>
        <InputLabel error={!!errors?.collectionType} id="collection-type">
          <Trans>Collection type</Trans>
        </InputLabel>
        <Select
          {...register?.('collectionType', { required: true })}
          labelId="collection-type"
          label={t`Collection Type`}
          defaultValue=""
          error={!!errors?.collectionType}
          id="collection-type-select"
          placeholder="Select..."
          disabled={isLoading}
        >
          {!isLoading &&
            data.collectionTypes.map((el: CollectionType) => {
              return (
                <MenuItem key={el.id} value={el.name}>
                  {el.name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Grid>
  )
}
