import { useState } from 'react'
import { Button } from '@mui/material'
import { Trans } from '@lingui/macro'
import { MarkdownPreviewDialog } from './'

function MarkdownPreviewButton() {
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleOpen = () => {
    setPreviewOpen(true)
  }
  const handleClose = () => {
    setPreviewOpen(false)
  }
  return (
    <>
      <Button
        component="a"
        color="info"
        sx={{
          opacity: '0.7',
          position: 'absolute',
          top: '-14px',
          right: '0px',
        }}
        onClick={handleOpen}
      >
        <Trans>Markdown preview</Trans>
      </Button>
      <MarkdownPreviewDialog open={previewOpen} handleClose={handleClose} />
    </>
  )
}

export default MarkdownPreviewButton
