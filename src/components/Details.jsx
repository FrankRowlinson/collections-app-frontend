import React from 'react'
import { Paper, Typography, Stack } from '@mui/material'

function Details(props) {
  const { details } = props

  return (
    <Stack spacing={2}>
      {details.map((el, key) => {
        return (
          <Paper elevation={2 } key={el.label}>
            <Typography variant="h6">{el.label}</Typography>
            <Typography variant="body1">{el.content}</Typography>
          </Paper>
        )
      })}
    </Stack>
  )
}

export default Details
