import moment from 'moment'
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  ToggleButton,
} from 'react-bootstrap'
import { IoMdHeartEmpty, IoMdHeart, IoIosChatboxes } from 'react-icons/io'

import ItemTitle from '../components/ItemTitle'
import Details from '../components/Details'
import ItemImage from '../components/ItemImage'
import CommentSection from '../components/CommentSection'

import './ItemDetail.css'

const details = [
  {
    field: 'Description',
    content:
      'Prncus eniedpis. Integer pharetra eros nec dui rhoncus eleifend. Aenean a est quis nisi facilisis mattis vel sit amet felis.',
  },
  {
    field: 'Year',
    content: 1999,
  },
  {
    field: 'Country',
    content: 'Scotland',
  },
]

const comments = [
  { author: 'Jerry', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Adam', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Clinton', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Vasya', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Arthur', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Gregory', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Helen', text: 'Good stuff', createdAt: Date.now() },
]

const date = Date.now()
const title =
  'Ballantines 12yo scotch whiskey with strong smoke aroma and flavour'
const author = 'Billy'
const collection = 'Whiskeys of the world'

function ItemDetail() {
  return (
    <Container fluid="md">
      <Row className="mt-4 justify-content-center">
        <Col md={5} lg={4}>
          <ItemImage src="https://picsum.photos/400/700" />
        </Col>
        <Col md={7} lg={6} className="mt-2">
          <ItemTitle title={title} />
          <p className="text-muted">{moment(date).format('LLL')}</p>
          <p className="h5">{author}</p>
          <p className="h5">{collection}</p>
          <Details details={details} />
          <ButtonGroup className="mt-3">
            <ToggleButton
              type="checkbox"
              variant="light"
              style={{ fontSize: 26 }}
            >
              <IoMdHeartEmpty />
            </ToggleButton>
            <Button variant="light" href="#comments" style={{ fontSize: 26 }}>
              <IoIosChatboxes />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="justify-content-center pt-3" id="comments">
        <Col lg={10} md={12}>
          <CommentSection comments={comments} />
        </Col>
      </Row>
    </Container>
  )
}

export default ItemDetail
