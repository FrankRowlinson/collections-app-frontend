import { CircularProgress, Box } from '@mui/material'

function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <CircularProgress color="inherit" size={50} thickness={4} />
    </Box>
  )
}

export default Loader
