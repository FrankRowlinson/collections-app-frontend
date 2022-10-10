import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useWatch } from 'react-hook-form'
import { Paper } from '@mui/material'

function MarkdownPreview({ control }) {
  const preview = useWatch({
    control,
    name: 'description',
  })

  return (
    <Paper variant="outlined" elevation={2} sx={{ minHeight: '100px', minWidth: '300pxI' }}>
      <ReactMarkdown>{preview}</ReactMarkdown>
    </Paper>
  )
}

export default MarkdownPreview
