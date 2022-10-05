import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
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

import ReactMarkdown from 'react-markdown'

const collectionTypes = [
  {
    label: 'Whiskey',
    value: 'WHISKEY',
  },
  {
    label: 'Cigars',
    value: 'CIGARS',
  },
  {
    label: 'Stamps',
    value: 'STAMPS',
  },
]

const fieldTypes = [
  {
    label: 'Line',
    value: 'STRING',
  },
  {
    label: 'Number',
    value: 'NUMBER',
  },
  {
    label: 'Text',
    value: 'TEXT',
  },
  {
    label: 'Date',
    value: 'DATE',
  },
  {
    label: 'Yes / No',
    value: 'BOOLEAN',
  },
]

function MarkdownPreview({ control }) {
  const preview = useWatch({
    control,
    name: 'description',
  })

  return <ReactMarkdown>{preview}</ReactMarkdown>
}

function AddCollection() {
  const [previewOpen, setPreviewOpen] = React.useState(false)

  const handleClickPreviewOpen = () => {
    setPreviewOpen(true)
  }

  const handlePreviewClose = () => {
    setPreviewOpen(false)
  }

  const [fieldNumber, setFieldNumber] = useState(2)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(errors)

  const onSubmit = (data) => console.log(data)

  return (
    <Container maxWidth="md" sx={{ mt: '30px' }}>
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
                id="collection-type-select"
                defaultValue={collectionTypes[0].value}
              >
                {collectionTypes.map((el, key) => {
                  return (
                    <MenuItem key={el.value} value={el.value}>
                      {el.label}
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
                Custom fields for collection
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFieldNumber(fieldNumber + 1)
                  }}
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFieldNumber(
                      fieldNumber > 0 ? fieldNumber - 1 : fieldNumber
                    )
                  }}
                >
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
          {[...Array(fieldNumber)].map((el, key) => {
            return (
              <Grid key={`${el}-${key}`} item container spacing={1} xs={12}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`select-field-${key}-label`}>
                      Field type
                    </InputLabel>
                    <Select
                      labelId={`select-field-${key}-label`}
                      label="Field Type"
                      defaultValue={fieldTypes[0].value || ''}
                      {...register(`custom-field-${key}-type`)}
                    >
                      {fieldTypes.map((el, key) => {
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
                    label="Field name"
                    id={`field-name-${key}`}
                    {...register(`custom-field-${key}-name`)}
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
