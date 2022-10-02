import { ListGroup } from 'react-bootstrap'

function Details(props) {
  const { details } = props

  return (
    <ListGroup>
      {details.map((el, key) => (
        <ListGroup.Item key={key}>{el.field}: {el.content}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Details
