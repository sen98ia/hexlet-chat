import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const ChannelsPanel = () => {
  const lala = 0;

  return (
    <Container>
      <Row className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <Col><b>Каналы</b></Col>
        <Col><Button variant="outline-primary" size="sm">+</Button></Col>
      </Row>
      <Row>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav>
      </Row>
    </Container>
  );
};

export default ChannelsPanel;
