import { Trans } from '@lingui/macro'
import { Button, Divider, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import {
  createCollection,
  getCollectionProps,
} from '../../../services/collectionAPI'
import { ButtonProgress } from '../../../shared'
import { useQuery } from 'react-query'
import { routes } from '../../../constants'
import {
  CollectionCover,
  CollectionDescription,
  CollectionName,
  CollectionType,
} from './Fields'
import { AddCollectionFormContext } from '../../../context'
import { CustomFieldsSection } from './'

function AddCollectionForm() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(
    ['createCollectionForm'],
    getCollectionProps
  )
  const [inProgress, setInProgress] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { customField: { type: '', name: '' } },
    shouldUnregister: true,
  })

  const onSubmit = async (formData) => {
    setInProgress(true)
    const response = await createCollection(formData)
    navigate(`${routes.COLLECTIONS}/byid/${response.data.collection_id}`)
  }
  return (
    <AddCollectionFormContext.Provider
      value={{ register, control, errors, isLoading, data, resetField }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="span">
              <Trans>General information</Trans>
            </Typography>
          </Grid>
          <CollectionName />
          <CollectionType />
          <CollectionDescription />
          <CollectionCover />
          <CustomFieldsSection />
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={inProgress}
              variant="contained"
              sx={{ position: 'relative' }}
            >
              <Trans>Create new collection!</Trans>
              <ButtonProgress inProgress={inProgress} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </AddCollectionFormContext.Provider>
  )
}

export default AddCollectionForm
