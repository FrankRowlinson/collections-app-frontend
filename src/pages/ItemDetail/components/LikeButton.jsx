import { useContext, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { like, dislike } from '../../../services/likeItem'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import routes from '../../../constants/routes'
import { t } from '@lingui/macro'

const likeAction = {
  true: like,
  false: dislike,
}

const snackbarResponse = {
  disliked: t`Item removed from your favorites`,
  liked: t`Item added to your favorites`,
}

function LikeButton({ itemId, likes, beenLiked }) {
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { user } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()
  const [selected, setSelected] = useState(beenLiked)
  const [inProgress, setInProgress] = useState(false)

  const handleLike = () => {
    if (user.role === 'GUEST') {
      showWarning()
    } else {
      performLikeAction()
    }
  }

  const showWarning = () => {
    confirm({
      title: '',
      description: t`You have to be a member to like items. Want to join now?`,
      confirmationButtonProps: { variant: 'contained' },
      confirmationText: t`Yes, show me the way`,
      cancellationText: t`Nah, I'll stay here`,
    })
      .then(() => {
        navigate(routes.SIGNUP)
      })
      .catch(() => {})
  }

  const performLikeAction = async () => {
    setInProgress(true)
    const response = await likeAction[!selected](itemId)
    if (response.status === 'ok') {
      enqueueSnackbar(snackbarResponse[response.action])
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
