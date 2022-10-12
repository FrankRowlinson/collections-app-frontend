import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Grid,
  Chip,
  Divider,
  TextField,
  Container,
  Typography,
  Autocomplete,
  Button,
} from '@mui/material'
import { getItemProps } from '../../services/getItemProps'
import { customFieldTypes } from '../../constants/customFieldTypes'
import NumberInput from '../../components/ItemFormFields/NumberInput'
import DateInput from '../../components/ItemFormFields/DateInput'
import CustomCheckbox from '../../components/ItemFormFields/CustomCheckbox'
import TextInput from '../../components/ItemFormFields/TextInput'
import TextareaInput from '../../components/ItemFormFields/TextareaInput'
import Loader from '../Loader/Loader'
import ControlledAutocomplete from '../../components/ItemFormFields/ControlledAutocomplete'

const fieldMapping = {
  number: NumberInput,
  text: TextInput,
  textarea: TextareaInput,
  date: DateInput,
  checkbox: CustomCheckbox,
}

function AddItem() {
  const { id } = useParams()
  const [customFields, setCustomFields] = useState(null)
  const [tagOptions, setTagOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemProps(id)
      setTagOptions(data.tags.tags)
      setCustomFields(data.fields.fields)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (customFields) {
      setIsLoading(false)
    }
  }, [customFields])

  const onSubmit = (data) => console.log(data)

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Add new item into collection
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">General information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Item name"
                  {...register('itemName', { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledAutocomplete name="tags" control={control} tagOptions={tagOptions}/>
              </Grid>
              {customFields.map((field, index) => {
                const { id, name, type } = field
                const InputElement = fieldMapping[customFieldTypes[type].type]
                return (
                  <Grid
                    key={`$custom.${customFieldTypes[type].type}.${id}`}
                    item
                    xs={12}
                    sm={
                      type === 'DATE'
                        ? 4
                        : type === 'NUMBER'
                        ? 6
                        : type === 'BOOLEAN'
                        ? 6
                        : 12
                    }
                  >
                    <InputElement control={control} name={name} />
                  </Grid>
                )
              })}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Create item!
              </Button>
            </Grid>
          </form>
        </>
      )}
    </Container>
  )
}

export default AddItem
