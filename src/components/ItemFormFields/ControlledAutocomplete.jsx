import { Autocomplete, TextField, Chip } from '@mui/material'
import { useController } from 'react-hook-form'

function ControlledAutocomplete({ name, control, tagOptions }) {
  const {
    field: { ref, onChange, ...field },
  } = useController({ name, control, defaultValue: [] })

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
        <TextField {...params} variant="outlined" label="Tags" inputRef={ref} />
      )}
    />
  )
}

export default ControlledAutocomplete
