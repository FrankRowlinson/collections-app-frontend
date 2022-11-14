import { Grid } from '@mui/material'
import { useContext } from 'react'
import { FormContext } from '../../../../../context'
import { ControlledAutocomplete } from './CustomFields'

function ItemTags() {
  const { data } = useContext(FormContext)
  return (
    <Grid item xs={12}>
      <ControlledAutocomplete
        name="tags"
        tagOptions={data.tags}
      />
    </Grid>
  )
}

export default ItemTags
