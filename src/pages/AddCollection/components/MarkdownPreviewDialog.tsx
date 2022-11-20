import { Dialog, DialogContent, Button, DialogActions } from '@mui/material'
import { MarkdownPreview } from '../../../common/components'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { FormContext } from '../../../common/context'

export function MarkdownPreviewDialog({ open, handleClose }: DialogProps) {
  const { control } = useContext(FormContext)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <MarkdownPreview control={control} />
        <DialogActions>
          <Button onClick={handleClose}>
            <Trans>Close preview</Trans>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
