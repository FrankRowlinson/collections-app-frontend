import { CircularProgress } from '@mui/material'

function ButtonProgress({ inProgress, size = 24 }) {
  return (
    <>
      {inProgress && (
        <CircularProgress
          size={size}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `-${size / 2}px`,
            marginLeft: `-${size / 2}px`,
          }}
        />
      )}
    </>
  )
}

export default ButtonProgress
