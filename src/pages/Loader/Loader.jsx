import React from 'react'
import {CircularProgress, Box} from '@mui/material'

function Loader() {
  return (
    
    <Box sx={{display: 'flex', minHeight: "85vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress color='inherit' size={50} thickness={4}/>
    </Box>
  )
}

export default Loader