import { t } from '@lingui/macro'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { useContext } from 'react'
import { useController } from 'react-hook-form'
import { FormContext } from '../../../../../../common/context'

interface Props {
  name: string
  tagOptions: Tag[]
}

export function ControlledAutocomplete({ name, tagOptions }: Props) {
  const { control } = useContext(FormContext)
  const {
    field: { ref, onChange, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
    rules: {
      validate: {
        tagLength: (value) =>
          value.every((el: string) => el.length <= 15) || t`Maximum tag length is 15`,
        arrayLength: (value) =>
          value.length <= 10 || t`Maximum amount of tags is 10`,
      },
    },
  })

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tagOptions.map((option: Tag) => option.name)}
      loading={!!tagOptions.length}
      loadingText={t`Loading...`}
      freeSolo
      {...field}
      onChange={(_, data) => {
        onChange(data)
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="filled"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          helperText={
            error
              ? error.message
              : t`Press 'Enter' to add new tag if it's not present in dropdown`
          }
          error={Boolean(error)}
          label={t`Tags`}
          inputRef={ref}
        />
      )}
    />
  )
}
