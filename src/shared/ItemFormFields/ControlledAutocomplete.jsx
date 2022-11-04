import { t } from '@lingui/macro'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function ControlledAutocomplete({ name, control, tagOptions }) {
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
          value.every((el) => el.length <= 15) || t`Maximum tag length is 15`,
        arrayLength: (value) =>
          value.length <= 10 || t`Maximum amount of tags is 10`,
      },
    },
  })

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tagOptions.map((option) => option.name)}
      loading={!!tagOptions.length}
      loadingText={t`Loading...`}
      freeSolo
      name="ControlledAutocomplete"
      {...field}
      onChange={(_, data) => {
        onChange(data)
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
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

export default ControlledAutocomplete
