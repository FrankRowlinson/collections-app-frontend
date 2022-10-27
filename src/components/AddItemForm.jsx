import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { Grid, Button, TextField, Typography, InputLabel } from '@mui/material'
import { MdSave, MdCheckCircle } from 'react-icons/md'
import { getItemProps } from '../services/getItemProps'
import { customFieldTypes } from '../constants/customFieldTypes'
import NumberInput from './ItemFormFields/NumberInput'
import DateInput from './ItemFormFields/DateInput'
import CustomCheckbox from './ItemFormFields/CustomCheckbox'
import TextInput from './ItemFormFields/TextInput'
import TextareaInput from './ItemFormFields/TextareaInput'
import Loader from '../pages/Loader/Loader'
import ControlledAutocomplete from './ItemFormFields/ControlledAutocomplete'
import { sendItem } from '../services/sendItem'
import routes from '../constants/routes'
import ButtonProgress from './ButtonProgress'

const fieldMapping = {
  number: NumberInput,
  text: TextInput,
  textarea: TextareaInput,
  date: DateInput,
  checkbox: CustomCheckbox,
}

function AddItemForm() {
  const { id } = useParams()
  const [customFields, setCustomFields] = useState(null)
  const [tagOptions, setTagOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [inProgress, setInProgress] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
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
    const response = await sendItem(data, id)
    navigate(`${routes.ITEMS}/byid/${response.itemId}`)
    setInProgress(false)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">General information</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <TextField
                fullWidth
                error={Boolean(errors.itemName)}
                helperText={errors.itemName && errors.itemName.message}
                label="Item name"
                {...register('itemName', {
                  required: 'Item name is required',
                  maxLength: {
                    value: 50,
                    message: 'Maximum length of name is 50',
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
                Image of item
              </Button>
              {itemImage ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => resetField('itemImage')}
                >
                  Reset image
                </Button>
              ) : (
                'no file selected'
              )}
            </Grid>
            {customFields.map((field, index) => {
              const { id, name: label, type } = field
              const InputElement = fieldMapping[customFieldTypes[type].type]
              return (
                <Grid
                  key={`$custom.${customFieldTypes[type].type}.${id}`}
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
              <Button variant="contained" type="submit" disabled={inProgress}>
                Create item!
                <ButtonProgress size={24} inProgress={inProgress} />
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default AddItemForm
