import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header';
import Image from 'react-bootstrap/Image';
import img from '../assets/registration.jpg';
import RegistrationForm from '../components/RegistrationForm';

const Registration = () => {
  return (
    <>
      <Header />
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Image src={img} fluid />
              </Col>
              <Col>
                <RegistrationForm/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Registration;