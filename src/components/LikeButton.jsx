import { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { like, dislike } from '../services/likeItem'
import { useSnackbar } from 'notistack'

const likeAction = {
  true: like,
  false: dislike,
}

function LikeButton({ itemId, likes, beenLiked }) {
  const { enqueueSnackbar } = useSnackbar()
  const [selected, setSelected] = useState(beenLiked)
  const [inProgress, setInProgress] = useState(false)

  const handleLike = async () => {
    setInProgress(true)
    const response = await likeAction[!selected](itemId)
    if (response.status === 'ok') {
      enqueueSnackbar(
        `Item ${
          response.action === 'disliked' ? 'removed from ' : 'added to '
        } your favorites`
      )
      setSelected(!selected)
    }
    setInProgress(false)
  }

  return (
    <>
      <Button
        variant="text"
        sx={{
          borderRadius: '25px',
          fontSize: 16,
          position: 'relative',
          px: 2,
        }}
        onClick={handleLike}
        disabled={inProgress}
        color="inherit"
        endIcon={selected ? <FaStar size={26} /> : <FaRegStar size={26} />}
      >
        {likes.length - Number(beenLiked) + Number(selected)}
        {inProgress && (
          <CircularProgress
            size={30}
            sx={{
              color: 'text.secondary',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-15px',
              marginLeft: '-15px',
            }}
          />
        )}
      </Button>
    </>
  )
}

export default LikeButton
