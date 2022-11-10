import { useContext } from 'react'
import { AddCollectionFormContext } from '../../../../context'
import { Grid, TextField } from '@mui/material'
import { t } from '@lingui/macro'
import { MarkdownPreviewButton } from '../'

function CollectionDescription() {
  const { register } = useContext(AddCollectionFormContext)
  return (
    <Grid
      item
      xs={12}
      marginTop={{ xs: 2, sm: 0 }}
      sx={{ position: 'relative' }}
    >
      <TextField
        {...register('description', { maxLength: 2500 })}
        label={t`Description`}
        id="collection-description-input"
        minRows={4}
        multiline
        fullWidth
        helperText={t`You can use Markdown to format text inside!`}
      ></TextField>
      <MarkdownPreviewButton />
    </Grid>
  )
}

export default CollectionDescription
