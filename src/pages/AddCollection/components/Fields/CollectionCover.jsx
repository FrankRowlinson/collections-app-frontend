import { Grid, Button, Icon, InputLabel } from '@mui/material'
import { Trans, t } from '@lingui/macro'
import { MdCheckCircle, MdSave } from 'react-icons/md'
import { useContext } from 'react'
import { FormContext } from '../../../../context'
import { useWatch } from 'react-hook-form'

function CollectionCover() {
  const { register, control, resetField } = useContext(FormContext)
  const coverImage = useWatch({
    control,
    name: 'collection-image',
  })
  return (
    <Grid
      item
      container
      xs={12}
      spacing={2}
      sx={{ dislpay: 'flex', alignItems: 'center' }}
    >
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<MdSave />}
          component={InputLabel}
        >
          <input type="file" hidden {...register('collection-image')} />
          <Trans>Cover Image</Trans>
        </Button>
      </Grid>
      <Grid item flexGrow={1}>
        {coverImage && coverImage.length ? (
          <Icon color="success" component={MdCheckCircle} />
        ) : (
          t`no file selected`
        )}
      </Grid>
      {coverImage && coverImage.length ? (
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => resetField('collection-image')}
          >
            <Trans>Reset image</Trans>
          </Button>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  )
}

export default CollectionCover
