import React from 'react'
import { CircularProgress, Box, Button } from '@mui/material';

function AuthButton(props) {
  const { inProgress, text } = props
  return (
    <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                disabled={inProgress}
                type="submit"
                fullWidth
              >
                {text}
              </Button>
              {inProgress && (
                <CircularProgress
                  size={24}
                  color="inherit"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
  )
}

export default AuthButton