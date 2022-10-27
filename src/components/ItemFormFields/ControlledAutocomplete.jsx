import { Autocomplete, TextField, Chip } from '@mui/material'
import { useController } from 'react-hook-form'
import { useEffect } from 'react'

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
          value.every((el) => el.length <= 15) || 'Maximum tag length is 15',
        arrayLength: (value) =>
          value.length <= 10 || 'Maximum amount of tags is 10',
      },
    },
  })

  useEffect(() => {
    console.log(error)
  })

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tagOptions.map((option) => option.name)}
      loading={!!tagOptions.length}
      loadingText="Loading..."
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
          helperText={error && error.message}
          error={Boolean(error)}
          label="Tags"
          inputRef={ref}
        />
      )}
    />
  )
}

export default ControlledAutocomplete
