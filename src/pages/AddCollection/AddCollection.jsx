import { t, Trans } from '@lingui/macro'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { MdAdd, MdCheckCircle, MdInfoOutline, MdSave } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useNavigate } from 'react-router-dom'
import { createCollection, getCollectionProps } from '../../services/collectionAPI'
import { ButtonProgress, MarkdownPreview } from '../../shared'

function AddCollection() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [inProgress, setInProgress] = useState(false)
  const [collectionTypes, setCollectionTypes] = useState([])
  const [fieldTypes, setFieldTypes] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
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
      const response = await getCollectionProps()
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

  // dialogs
  const handleClickPreviewOpen = () => {
    setPreviewOpen(true)
  }

  const handlePreviewClose = () => {
    setPreviewOpen(false)
  }

  const handleClickInfoOpen = () => {
    setInfoOpen(true)
  }

  const handleInfoClose = () => {
    setInfoOpen(false)
  }

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await createCollection(data)
    navigate(`/collections/byid/${response.data.collection_id}`)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        <Trans>Create new collection</Trans>
      </Typography>
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
          <Grid item xs={12}>
            <TextField
              {...register('collectionName', {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              id="collection-name"
              label={t`Collection name`}
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
                <Trans>Collection type</Trans>
              </InputLabel>
              <Select
                {...register('collectionType', { required: true })}
                labelId="collection-type"
                label={t`Collection Type`}
                defaultValue=""
                error={!!errors.collectionType}
                id="collection-type-select"
                placeholder="Select..."
                disabled={isLoading}
              >
                {!isLoading &&
                  collectionTypes.map((el) => {
                    return (
                      <MenuItem key={el.id} value={el.name}>
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
              label={t`Description`}
              id="collection-description-input"
              minRows={4}
              multiline
              fullWidth
              helperText={t`You can use Markdown to format text inside!`}
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
              <Trans>Markdown preview</Trans>
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
                <Trans>Cover Image</Trans>
              </Button>
            </Grid>
            <Grid item flexGrow={1}>
              {coverImage && coverImage.length ? (
                <Icon color="success" component={MdCheckCircle} />
              ) : (
                t`no file selected`
              )}
            </Grid>
            {coverImage && coverImage.length ? (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => resetField('collection-image')}
                >
                  <Trans>Reset image</Trans>
                </Button>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6" component="span">
                <Trans>Custom fields for your collection</Trans>
                <IconButton sx={{ ml: '5px' }} onClick={handleClickInfoOpen}>
                  <MdInfoOutline size={20} />
                </IconButton>
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <Trans>
                  Describe items in your collection with as much additional info
                  as you need with flexible options
                </Trans>
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
                <Trans>New field</Trans>
              </Button>
            </Grid>

            {fields.map((field, index) => (
              <Grid item container key={field.id} spacing={1} xs={12}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`customField.${index}.label`}>
                      {t`Field Type`}
                    </InputLabel>
                    <Select
                      labelId={`customField.${index}.label`}
                      label={t`Field Type`}
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
                    label={t`Field name`}
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
                    <Trans>Delete field</Trans>
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
              <Trans>Create new collection!</Trans>
              <ButtonProgress inProgress={inProgress} />
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
            <Button onClick={handlePreviewClose}>
              <Trans>Close preview</Trans>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={infoOpen} onClose={handleInfoClose}>
        <DialogContent>
          <ReactMarkdown>
            {t`Better explained with example.  
            Let's say you want to add **"Description"** for every item in this collection, like the one
            you see above. For that you want to add new *field* with type
            **"Text"** and name it **"Description"**. Same goes for every other
            type of field. *Release date for vinyl?* Add **"Date"** field and
            name it **"Release date"** and you're good to go!  
            If you want to add
            something complex like *number with floating point* or *date **AND**
            time* on the same field, you could use workaround with field type
            **"Line"**. This is just plain string of text, but a little bit
            shorter than proper **"Text"** field.`}
          </ReactMarkdown>
          <DialogActions>
            <Button onClick={handleInfoClose}>
              <Trans>Got it!</Trans>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  )
}
export default AddCollection
