import moment from 'moment'

function Comment(props) {
  const {comment} = props
  return (
    <div>
      <h5>{comment.author}</h5>
      <p className="text-muted">{moment(comment.createdAt).format('LLL')}</p>
      <p>{comment.text}</p>
    </div>
  )
}

export default Comment