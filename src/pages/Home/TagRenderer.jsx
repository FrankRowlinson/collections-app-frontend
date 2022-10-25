import { Chip, Typography } from '@mui/material'

const TagRenderer = (tag, color, size) => {
  return (
    <Chip
      key={tag.key}
      size='small'
      label={
        <Typography variant="overline" sx={{ fontSize: size }}>
          {tag.value}
        </Typography>
      }
      sx={{ m: '3px' }}
    />
  )
}
export default TagRenderer
