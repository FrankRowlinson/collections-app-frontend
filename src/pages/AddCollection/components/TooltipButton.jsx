import { useState } from 'react'
import { MdInfoOutline } from 'react-icons/md'
import { IconButton } from '@mui/material'
import { TooltipDialog } from './'

function TooltipButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const handleOpen = () => {
    setTooltipOpen(true)
  }

  const handleClose = () => {
    setTooltipOpen(false)
  }
  return (
    <>
      <IconButton sx={{ ml: '5px' }} onClick={handleOpen}>
        <MdInfoOutline size={20} />
      </IconButton>
      <TooltipDialog open={tooltipOpen} handleClose={handleClose} />
    </>
  )
}

export default TooltipButton
