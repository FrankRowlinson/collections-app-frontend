import React, { useState, useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  Container,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  MenuItem,
  Button,
  Icon,
} from '@mui/material'
import { MdAdd, MdCheckCircle, MdSave } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { sendCollection } from '../../services/sendCollection'
import MarkdownPreview from '../../components/MarkdownPreview'
import { getCollectionFormProps } from '../../services/getCollectionProps'
import { useNavigate } from 'react-router-dom'
import ButtonProgress from '../../components/ButtonProgress'

function AddCollection() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [inProgress, setInProgress] = useState(false)
  const [collectionTypes, setCollectionTypes] = useState([])
  const [fieldTypes, setFieldTypes] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'customField',
    shouldUnregister: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCollectionFormProps()
      setCollectionTypes(response.collectionTypes)
      setFieldTypes(response.fieldTypes)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const coverImage = useWatch({
    control,
    name: 'collection-image',
  })

  const handleClickPreviewOpen = () => {
    setPreviewOpen(true)
  }

  const handlePreviewClose = () => {
    setPreviewOpen(false)
  }

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await sendCollection(data)
    navigate(`/collections/byid/${response.data.collection_id}`)
  }

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Create new collection</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="span">
              General information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('collectionName', {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              id="collection-name"
              label="Collection name"
              autoComplete="off"
              error={!!errors.collectionName}
              helperText={
                errors.collectionName ? errors.collectionName.message : ''
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: '300px' }} fullWidth>
              <InputLabel error={!!errors.collectionType} id="collection-type">
                Collection type
              </InputLabel>
              <Select
                {...register('collectionType', { required: true })}
                labelId="collection-type"
                label="Collection Type"
                defaultValue=""
                error={!!errors.collectionType}
                id="collection-type-select"
                placeholder="Select..."
                disabled={isLoading}
              >
                {!isLoading &&
                  collectionTypes.map((el) => {
                    return (
                      <MenuItem key={el.name} value={el.name}>
                        {el.name}
                      </MenuItem>
                    )
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            marginTop={{ xs: 2, sm: 0 }}
            sx={{ position: 'relative' }}
          >
            <TextField
              {...register('description', { maxLength: 2500 })}
              label="Description"
              id="collection-description-input"
              minRows={4}
              multiline
              fullWidth
              helperText="You can use Markdown to format text inside!"
            ></TextField>
            <Button
              component="a"
              color="info"
              sx={{
                opacity: '0.7',
                position: 'absolute',
                top: '-14px',
                right: '0px',
              }}
              onClick={handleClickPreviewOpen}
            >
              Markdown preview
            </Button>
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
                <input type="file" hidden {...register('collection-image')} />
                Cover Image
              </Button>
            </Grid>
            <Grid item flexGrow={1}>
              {coverImage && coverImage.length ? (
                <Icon color="success" component={MdCheckCircle} />
              ) : (
                'no file selected'
              )}
            </Grid>
            {coverImage && coverImage.length ? (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => resetField('collection-image')}
                >
                  Reset image
                </Button>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6" component="span">
                Custom fields for your collection
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Describe items in your collection with as much additional info
                as you need with flexible options
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Button
                variant="contained"
                endIcon={<MdAdd />}
                onClick={() => {
                  append({
                    name: '',
                    type: '',
                  })
                }}
              >
                New field
              </Button>
            </Grid>

            {fields.map((field, index) => (
              <Grid item container key={field.id} spacing={1} xs={12}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`customField.${index}.label`}>
                      Field Type
                    </InputLabel>
                    <Select
                      labelId={`customField.${index}.label`}
                      label="Field Type"
                      defaultValue=""
                      {...register(`customField.${index}.type`, {
                        required: true,
                      })}
                    >
                      {isLoading
                        ? ''
                        : fieldTypes.map((el, key) => {
                            return (
                              <MenuItem value={el.value} key={`${el}-${key}`}>
                                {el.label}
                              </MenuItem>
                            )
                          })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    label="Field name"
                    {...register(`customField.${index}.name`, {
                      required: true,
                      minLength: 3,
                      maxLength: 75,
                    })}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    endIcon={<TiDeleteOutline />}
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    Delete field
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={inProgress}
              variant="contained"
              sx={{ position: 'relative' }}
            >
              Create new collection!
              <ButtonProgress size={24} inProgress={inProgress} />
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={previewOpen} onClose={handlePreviewClose}>
        <DialogContent>
          <MarkdownPreview
            style={{ py: '20px', px: '10px' }}
            control={control}
          />
          <DialogActions>
            <Button onClick={handlePreviewClose}>Close preview</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  )
}
export default AddCollection
