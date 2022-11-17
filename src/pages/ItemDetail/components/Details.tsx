import { Typography, Stack, Box } from '@mui/material'
import moment from 'moment'

interface Props {
  fields: ItemInfo['fields']
}

export function Details({ fields }: Props) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        {fields.stringFields.map((field: ItemField) => {
          return (
            <Box
              key={field.id}
              sx={{ display: !!field.value.length ? 'block' : 'none' }}
            >
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {field.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {field.value}
              </Typography>
            </Box>
          )
        })}
        {fields.numberFields.map((field: ItemField) => {
          return (
            <Box key={field.id}>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: 700 }}
              >
                {field.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {field.value}
              </Typography>
            </Box>
          )
        })}
        {fields.booleanFields.map((field: ItemField) => {
          return (
            <Box key={field.id}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {field.fieldName}:
              </Typography>
              <Typography component="span">
                {' '}
                {field.value ? 'Yes' : 'No'}
              </Typography>
            </Box>
          )
        })}
        {fields.textFields.map((field: ItemField) => {
          return (
            <Box
              key={field.id}
              sx={{ display: !!field.value.length ? 'block' : 'none' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {field.fieldName}
              </Typography>
              <Typography variant="body1"> {field.value}</Typography>
            </Box>
          )
        })}
        {fields.dateFields.map((field: ItemField) => {
          return (
            <Box key={field.id}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {field.fieldName}:
              </Typography>
              <Typography component="span" variant="body1">
                {' '}
                {moment(field.value).format('LL')}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
