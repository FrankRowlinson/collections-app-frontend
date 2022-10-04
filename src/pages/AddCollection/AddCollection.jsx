import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  Form,
  Container,
  Button,
  ButtonGroup,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap'
import { BsDashLg, BsPlusLg } from 'react-icons/bs'

import { sendCollection } from '../../services/sendCollection'

function AddCollection() {
  const [fieldNumber, setFieldNumber] = useState(3)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)

  return (
    <Container fluid="md" className="mt-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <ButtonGroup>
            <Button
              onClick={() => {
                setFieldNumber(fieldNumber + 1)
              }}
            >
              <BsPlusLg />
            </Button>
            <Button
              onClick={() => {
                setFieldNumber(fieldNumber > 0 ? fieldNumber - 1 : fieldNumber)
              }}
            >
              <BsDashLg />
            </Button>
          </ButtonGroup>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel label="Collection name...">
              <Form.Control
                type="text"
                placeholder="Collection name"
                {...register('collectionName')}
              />
            </FloatingLabel>
            {[...Array(fieldNumber)].map((_, i) => {
              return (
                <Row key={i} className="mt-4 mt-md-2">
                  <Form.Group as={Col}>
                    <FloatingLabel label="Field type">
                      <Form.Select
                        key={`fieldType${i}`}
                        {...register(`fieldType${i}`)}
                      >
                        <option value="STRING">Line</option>
                        <option value="TEXT">Text</option>
                        <option value="NUMBER">Number</option>
                        <option value="DATE">Date</option>
                        <option value="BOOLEAN">Checkbox</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md={8}>
                    <FloatingLabel label="Field name...">
                      <Form.Control
                        type="text"
                        key={`fieldName${i}`}
                        placeholder="Field Name"
                        {...register(`fieldName${i}`)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              )
            })}
            <Button type="submit">Create Collection</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddCollection
