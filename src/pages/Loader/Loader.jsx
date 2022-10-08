import React from 'react'
import {CircularProgress, Box} from '@mui/material'

function Loader() {
  return (
    
    <Box sx={{display: 'flex', minHeight: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress size={50} color="primary"/>
    </Box>
  )
}

export default Loader