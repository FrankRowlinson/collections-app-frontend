import { t } from '@lingui/macro'
import { Button } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useSnackbar } from 'notistack'
import { useContext, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../common/constants'
import { UserContext } from '../../../common/context'
import { dislike, like } from '../../../common/services'
import { ButtonProgress } from '../../../common/components'

const likeAction: Mapping = {
  true: like,
  false: dislike,
}

const snackbarResponse: Mapping = {
  disliked: t`Item removed from your favorites`,
  liked: t`Item added to your favorites`,
}

interface Props {
  itemId: string
  likes: Like[]
  beenLiked: boolean
}

export function LikeButton({ itemId, likes, beenLiked }: Props) {
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { user } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()
  const [liked, setLiked] = useState<boolean>(beenLiked)
  const [inProgress, setInProgress] = useState<boolean>(false)

  const handleLike = () => {
    if (user?.role === 'GUEST') {
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
    const response = await likeAction[String(!liked)](itemId)
    if (response.status === 'ok') {
      enqueueSnackbar(snackbarResponse[response.action])
      setLiked(!liked)
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
        endIcon={liked ? <FaStar size={26} /> : <FaRegStar size={26} />}
      >
        {likes.length - Number(beenLiked) + Number(liked)}
        <ButtonProgress inProgress={inProgress} size={30} />
      </Button>
    </>
  )
}
