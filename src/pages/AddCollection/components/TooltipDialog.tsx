import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import { Trans, t } from '@lingui/macro'

export function TooltipDialog({ open, handleClose }: DialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <ReactMarkdown>
          {t`Better explained with example.  
            Let's say you want to add **"Description"** for every item in this collection, like the one
            you see above. For that you want to add new *field* with type
            **"Text"** and name it **"Description"**. Same goes for every other
            type of field. *Release date for vinyl?* Add **"Date"** field and
            name it **"Release date"** and you're good to go!  
            If you want to add
            something complex like *number with floating point* or *date **AND**
            time* on the same field, you could use workaround with field type
            **"Line"**. This is just plain string of text, but a little bit
            shorter than proper **"Text"** field.`}
        </ReactMarkdown>
        <DialogActions>
          <Button onClick={handleClose}>
            <Trans>Got it!</Trans>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
