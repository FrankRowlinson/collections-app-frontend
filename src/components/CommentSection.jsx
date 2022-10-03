import { ListGroup } from 'react-bootstrap';
import Comment from './Comment'

function CommentSection(props) {
  const { comments } = props
  return <ListGroup className="shadow">
    {comments.map((comment, key) => {
      return (
      <ListGroup.Item key={key}>
        <Comment comment={comment}/>
      </ListGroup.Item>
      )
    })}
  </ListGroup>
}

export default CommentSection
