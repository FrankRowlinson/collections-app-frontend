import { Paper } from '@mui/material'
import { useWatch, Control } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

interface Props {
  control: Control
}

export function MarkdownPreview({ control }: Props) {
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
