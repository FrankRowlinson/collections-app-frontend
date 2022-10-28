import ReactMarkdown from 'react-markdown'
import { useWatch } from 'react-hook-form'
import { Paper } from '@mui/material'

function MarkdownPreview({ control }) {
  const preview = useWatch({
    control,
    name: 'description',
  })

  return (
    <Paper elevation={2} sx={{ minHeight: '100px', minWidth: '300pxI', p: 2 }}>
      <ReactMarkdown>{preview}</ReactMarkdown>
    </Paper>
  )
}

export default MarkdownPreview
