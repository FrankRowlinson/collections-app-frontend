import { Grid, Button, InputLabel } from '@mui/material'
import { Trans, t } from '@lingui/macro'
import { MdCheckCircle, MdSave } from 'react-icons/md'
import { FormContext } from '../../../../../context'
import { useContext } from 'react'
import { useWatch } from 'react-hook-form'

function ItemImage() {
  const { control, register, resetField } = useContext(FormContext)
  const itemImage = useWatch({
    control,
    name: 'itemImage',
  })
  return (
    <Grid item xs={12} sx={{ dislpay: 'flex', alignItems: 'center' }}>
      <Button
        variant="outlined"
        startIcon={itemImage ? <MdCheckCircle /> : <MdSave />}
        component={InputLabel}
        sx={{ mr: 2 }}
        color={itemImage ? 'success' : 'primary'}
      >
        <input type="file" hidden {...register('itemImage')} />
        <Trans>Image of item</Trans>
      </Button>
      {itemImage ? (
        <Button
          variant="outlined"
          color="error"
          onClick={() => resetField('itemImage')}
        >
          <Trans>Reset image</Trans>
        </Button>
      ) : (
        t`no file selected`
      )}
    </Grid>
  )
}

export default ItemImage
