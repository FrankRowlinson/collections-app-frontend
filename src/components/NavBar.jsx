import { Container, Form, Navbar, Nav, Button } from 'react-bootstrap'
import { MdSearch } from 'react-icons/md'

function NavBar() {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="my-2 my-md-0 w-100 justify-content-end">
          <Form className="d-flex order-last order-md-first">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
              <MdSearch style={{ fontSize: '20' }} />
            </Button>
          </Form>
            <Nav.Link href="#">Login</Nav.Link>
            <Nav.Link href="#">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
