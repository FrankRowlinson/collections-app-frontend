import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  ButtonGroup,
} from '@mui/material'

import MarkdownPreview from '../../components/MarkdownPreview'
import getCollectionFormProps from '../../services/getCollectionProps'

function AddCollection() {
  const [isLoading, setIsLoading] = useState(true)
  const [collectionTypes, setCollectionTypes] = useState([])
  const [fieldNumber, setFieldNumber] = useState(2)
  const [fieldTypes, setFieldTypes] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCollectionFormProps()
      setCollectionTypes(response.collectionTypes)
      setFieldTypes(response.fieldTypes)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const {
    register,
    control,
    handleSubmit,
    // formState: { errors }, // TODO: implement error display
    unregister
  } = useForm()

  const handleFieldAddition = () => {
    setFieldNumber(fieldNumber + 1)
  }

  const handleFieldDeletion = () => {
    if (fieldNumber > 0) {
      unregister([`custom-field-${fieldNumber}-name`, `custom-field-${fieldNumber}-type`])
      setFieldNumber(fieldNumber - 1)
    }
  }

  const handleClickPreviewOpen = () => {
    setPreviewOpen(true)
  }

  const handlePreviewClose = () => {
    setPreviewOpen(false)
  }

  const onSubmit = (data) => console.log(data)

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">Create new collection</Typography>
            <Divider />
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: '300px' }}>
              <InputLabel id="collection-type">Collection type</InputLabel>
              <Select
                {...register('collectionType')}
                labelId="collection-type"
                label="Collection Type"
                defaultValue=""
                id="collection-type-select"
                placeholder="Select..."
                disabled={isLoading}
              >
                {collectionTypes.map((el) => {
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
              {...register('description')}
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
                top: '-7px',
                right: '10px',
              }}
              onClick={handleClickPreviewOpen}
            >
              Show preview
            </Button>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography variant="h6" component="span">
                Custom fields for your collection
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup>
                <Button variant="outlined" onClick={handleFieldAddition}>
                  +
                </Button>
                <Button variant="outlined" onClick={handleFieldDeletion}>
                  -
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          {fieldNumber ? (
            ''
          ) : (
            <Grid item xs={12}>
              <Typography variant="caption">
                Use controls above to add or remove additional fields for your
                collection
              </Typography>
            </Grid>
          )}
          {[...Array(fieldNumber)].map((_, index) => index + 1).map((number, key) => {
            return (
              <Grid key={`${number}-${key}`} item container spacing={1} xs={12}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`select-field-${number}-label`}>
                      Field type
                    </InputLabel>
                    <Select
                      labelId={`select-field-${number}-label`}
                      label="Field Type"
                      defaultValue=""
                      helperText={''}
                      {...register(`custom-field-${number}-type`, {required: true})}
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
                    id={`field-name-${number}`}
                    {...register(`custom-field-${number}-name`, {required: true})}
                  />
                </Grid>
              </Grid>
            )
          })}
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Create new collection!
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
