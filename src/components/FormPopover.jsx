import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { Typography } from '@mui/material'
import { MdInfo } from 'react-icons/md'
import { t } from '@lingui/macro'

function FormPopover({ field }) {
  const formPopoverVariants = {
    'signup-username': t`Username must be at least 4 characters long and must not start with digit`,
    'signup-password': t`Password must be at least 8 characters`,
  }

  return (
    <PopupState variant="popover" popupId={`${field}-popover`}>
      {(popupState) => (
        <>
          <MdInfo {...bindHover(popupState)} />
          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography color="inherit" sx={{ p: 1 }}>
              {formPopoverVariants[field]}
            </Typography>
          </HoverPopover>
        </>
      )}
    </PopupState>
  )
}

export default FormPopover
