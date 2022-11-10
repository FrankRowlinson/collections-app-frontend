import { Grid, Typography, Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { TooltipButton } from './'
import { TiDeleteOutline } from 'react-icons/ti'
import { Trans } from '@lingui/macro'
import { CustomField } from './Fields'
import { useContext } from 'react'
import { AddCollectionFormContext } from '../../../context'
import { ButtonProgress } from '../../../shared'
import { useFieldArray } from 'react-hook-form'

function CustomFieldsSection() {
  const { control, isLoading, data } = useContext(AddCollectionFormContext)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'customField',
    shouldUnregister: true,
  })

  return (
    <Grid item container xs={12} spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6" component="span">
          <Trans>Custom fields for your collection</Trans>
          <TooltipButton />
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          <Trans>
            Describe items in your collection with as much additional info as
            you need with flexible options
          </Trans>
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Button
          variant="contained"
          endIcon={<MdAdd />}
          disabled={isLoading}
          onClick={() => {
            append({
              name: '',
              type: '',
            })
          }}
        >
          <Trans>New field</Trans>
          <ButtonProgress inProgress={isLoading} />
        </Button>
      </Grid>
      {isLoading ? (
        ''
      ) : (
        <>
          {fields.map((field, index) => (
            <Grid item container key={field.id} spacing={1} xs={12}>
              <CustomField fieldTypes={data.fieldTypes} index={index} />
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ mb: 1 }}
                  endIcon={<TiDeleteOutline />}
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <Trans>Delete field</Trans>
                </Button>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}

export default CustomFieldsSection
