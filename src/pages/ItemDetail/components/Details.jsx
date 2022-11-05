import { Typography, Stack, Box } from '@mui/material'
import moment from 'moment'

function Details({ fields }) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        {fields.stringFields.map((el) => {
          return (
            <Box
              key={el.id}
              sx={{ display: !!el.value.length ? 'block' : 'none' }}
            >
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {el.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {el.value}
              </Typography>
            </Box>
          )
        })}
        {fields.numberFields.map((el) => {
          return (
            <Box key={el.id}>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: 700 }}
              >
                {el.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {el.value}
              </Typography>
            </Box>
          )
        })}
        {fields.booleanFields.map((el) => {
          return (
            <Box key={el.id}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {el.fieldName}:
              </Typography>
              <Typography component="span">
                {' '}
                {el.value ? 'Yes' : 'No'}
              </Typography>
            </Box>
          )
        })}
        {fields.textFields.map((el) => {
          return (
            <Box
              key={el.id}
              sx={{ display: !!el.value.length ? 'block' : 'none' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {el.fieldName}
              </Typography>
              <Typography variant="body1"> {el.value}</Typography>
            </Box>
          )
        })}
        {fields.dateFields.map((el) => {
          return (
            <Box key={el.id}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {el.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {moment(el.value).format('LL')}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Details
