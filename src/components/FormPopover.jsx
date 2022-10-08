import React from 'react'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { Typography } from '@mui/material'
import { MdInfo } from 'react-icons/md'
import { formPopoverVariants } from '../constants/texts'

function FormPopover({ field }) {
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
            <Typography color="inherit" sx={{ p: 1 }}>{formPopoverVariants[field]}</Typography>
          </HoverPopover>
        </>
      )}
    </PopupState>
  )
}

export default FormPopover
