import { t, Trans } from '@lingui/macro'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../../constants'
import { createItem } from '../../../../services/itemAPI'
import getItemProps from '../../../../services/getItemProps'
import { ButtonProgress } from '../../../../shared'
import { useQuery } from 'react-query'
import { CollectionContext, FormContext } from '../../../../context'
import { ItemImage, ItemName, ItemTags } from './Fields'
import { CustomItemFields } from './'
import { useContext } from 'react'

function AddItemForm() {
  const { rightToEdit, collection, refetch } = useContext(CollectionContext)
  const { id } = useParams()
  const { data, isLoading } = useQuery(['addItemForm'], getItemProps(id))
  const [inProgress, setInProgress] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [openItemOnSubmit, setOpenItemOnSubmit] = useState(true)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await createItem(data, id)
    if (openItemOnSubmit) {
      navigate(`${routes.ITEMS}/byid/${response.itemId}`)
    }
    reset()
    refetch()
    enqueueSnackbar(t`Item successfully created!`, { variant: 'success' })
    setInProgress(false)
  }

  return (
    <>
      {rightToEdit && (
        <Grid item xs={12}>
          <Button
            variant={formOpen ? 'outlined' : 'contained'}
            color={formOpen ? 'error' : 'primary'}
            href="#add-item"
            onClick={() => setFormOpen(!formOpen)}
            disabled={isLoading}
          >
            {formOpen ? t`Cancel` : t`Add item`}
            <ButtonProgress inProgress={isLoading} />
          </Button>
        </Grid>
      )}
      {formOpen && (
        <Grid item xs={12}>
          <Typography
            id="add-item"
            sx={{ pt: 1, mt: -1, fontWeight: 500 }}
            variant="h6"
          >{t`Add item into "${collection.name}"`}</Typography>
          <Divider sx={{ mb: 2 }} />
          <FormContext.Provider
            value={{ register, errors, control, resetField, data }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Trans>General information</Trans>
                  </Typography>
                </Grid>
                <ItemName />
                <ItemTags />
                <ItemImage />
                <CustomItemFields />
                <Grid item xs={12}>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    type="submit"
                    disabled={inProgress}
                  >
                    <Trans>Create item!</Trans>
                    <ButtonProgress inProgress={inProgress} />
                  </Button>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={openItemOnSubmit}
                        onChange={() => {
                          setOpenItemOnSubmit(!openItemOnSubmit)
                        }}
                      />
                    }
                    label={t`Open item page as soon as it is created`}
                  />
                </Grid>
              </Grid>
            </form>
          </FormContext.Provider>
        </Grid>
      )}
    </>
  )
}

export default AddItemForm
