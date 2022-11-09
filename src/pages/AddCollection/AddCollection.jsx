import { t, Trans } from '@lingui/macro'
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { MdAdd, MdCheckCircle, MdSave } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import {
  createCollection,
  getCollectionProps,
} from '../../services/collectionAPI'
import { ButtonProgress } from '../../shared'
import { useQuery } from 'react-query'
import { routes } from '../../constants'
import { MarkdownPreviewButton, TooltipButton } from './components'
import { CustomField } from './components/Fields'
import { AddCollectionFormContext } from '../../context'

function AddCollection() {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'customField',
    shouldUnregister: true,
  })

  const coverImage = useWatch({
    control,
    name: 'collection-image',
  })

  const onSubmit = async (formData) => {
    setInProgress(true)
    const response = await createCollection(formData)
    navigate(`${routes.COLLECTIONS}/byid/${response.data.collection_id}`)
  }

  return (
    <Container maxWidth="md">
      <AddCollectionFormContext.Provider value={{ register, control }}>
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
                <InputLabel
                  error={!!errors.collectionType}
                  id="collection-type"
                >
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
                    data.collectionTypes.map((el) => {
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
              <MarkdownPreviewButton />
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
                  <TooltipButton />
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <Trans>
                    Describe items in your collection with as much additional
                    info as you need with flexible options
                  </Trans>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Button
                  variant="contained"
                  endIcon={<MdAdd />}
                  disabled={isLoading}
                  onClick={() => {
                    append({
                      name: '',
                      type: '',
                    })
                  }}
                >
                  <Trans>New field</Trans>
                  <ButtonProgress inProgress={isLoading} />
                </Button>
              </Grid>
              {isLoading ? (
                ''
              ) : (
                <>
                  {fields.map((field, index) => (
                    <Grid item container key={field.id} spacing={1} xs={12}>
                      <CustomField
                        register={register}
                        fieldTypes={data.fieldTypes}
                        index={index}
                      />
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
                </>
              )}
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
      </AddCollectionFormContext.Provider>
    </Container>
  )
}
export default AddCollection
