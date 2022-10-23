import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import {
  Icon,
  Grid,
  Button,
  TextField,
  Typography,
  InputLabel,
} from '@mui/material'
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

  const { register, control, handleSubmit, resetField } = useForm()

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
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6">General information</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <TextField
                fullWidth
                label="Item name"
                {...register('itemName', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledAutocomplete
                name="tags"
                control={control}
                tagOptions={tagOptions}
              />
            </Grid>
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
                  <input type="file" hidden {...register('itemImage')} />
                  Image of item
                </Button>
              </Grid>
              <Grid item>
                {itemImage ? (
                  <Icon color="success" component={MdCheckCircle} />
                ) : (
                  'no file selected'
                )}
              </Grid>
              {itemImage ? (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => resetField('itemImage')}
                  >
                    Reset image
                  </Button>
                </Grid>
              ) : (
                ''
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
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default AddItemForm
