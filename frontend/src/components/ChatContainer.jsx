import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RegistrationCard = () => {
  return (
    <Container className="h-100 my-4 overflow-hidden shadow rounded">
      <Row className="h-100 bg-white flex-md-row">
        <Col>channels</Col>
        <Col>chat</Col>
      </Row>
    </Container>
  );
};

export default RegistrationCard;
