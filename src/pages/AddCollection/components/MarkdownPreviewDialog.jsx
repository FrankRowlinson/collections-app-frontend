import { Dialog, DialogContent, Button, DialogActions } from '@mui/material'
import { MarkdownPreview } from '../../../shared'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { FormContext } from '../../../context'

function MarkdownPreviewDialog({ open, handleClose }) {
  const { control } = useContext(FormContext)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <MarkdownPreview style={{ py: '20px', px: '10px' }} control={control} />
        <DialogActions>
          <Button onClick={handleClose}>
            <Trans>Close preview</Trans>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default MarkdownPreviewDialog
