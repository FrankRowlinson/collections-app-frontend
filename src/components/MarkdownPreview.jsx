import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useWatch } from 'react-hook-form'

function MarkdownPreview({ control }) {
  const preview = useWatch({
    control,
    name: 'description',
  })

  return <ReactMarkdown>{preview}</ReactMarkdown>
}

export default MarkdownPreview
