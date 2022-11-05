import { t, Trans } from '@lingui/macro'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { MdCheckCircle, MdSave } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { routes, customFieldTypes } from '../../../constants'
import { createItem } from '../../../services/itemAPI'
import getItemProps from '../../../services/getItemProps'
import { ButtonProgress } from '../../../shared'
import {
  ControlledAutocomplete,
  CustomCheckbox,
  DateInput,
  NumberInput,
  TextareaInput,
  TextInput,
} from '../../../shared/ItemFormFields'

const fieldMapping = {
  number: NumberInput,
  text: TextInput,
  textarea: TextareaInput,
  date: DateInput,
  checkbox: CustomCheckbox,
}

function AddItemForm({ rightToEdit, collectionName, refetch }) {
  const { id } = useParams()
  const [customFields, setCustomFields] = useState(null)
  const [tagOptions, setTagOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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

  const itemImage = useWatch({
    control,
    name: 'itemImage',
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemProps(id)
      setTagOptions(data.tags)
      setCustomFields(data.fields)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (customFields) {
      setIsLoading(false)
    }
  }, [customFields])

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
          >{t`Add item into "${collectionName}"`}</Typography>
          <Divider sx={{ mb: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <Trans>General information</Trans>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={6}>
                <TextField
                  fullWidth
                  error={Boolean(errors.itemName)}
                  helperText={errors.itemName && errors.itemName.message}
                  label={t`Item name`}
                  {...register('itemName', {
                    required: t`Item name is required`,
                    maxLength: {
                      value: 50,
                      message: t`Maximum length of name is 50`,
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledAutocomplete
                  name="tags"
                  control={control}
                  tagOptions={tagOptions}
                />
              </Grid>
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
              {customFields.map((field, index) => {
                const { id, name: label, type } = field
                const InputElement = fieldMapping[customFieldTypes[type].type]
                return (
                  <Grid
                    key={id}
                    item
                    xs={12}
                    sm={type === 'DATE' ? 4 : type === 'NUMBER' ? 4 : 12}
                    md={type === 'DATE' ? 6 : type === 'NUMBER' ? 6 : 12}
                  >
                    <InputElement
                      control={control}
                      label={label}
                      name={`${type}Field${index}`}
                    />
                  </Grid>
                )
              })}
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
        </Grid>
      )}
    </>
  )
}

export default AddItemForm
