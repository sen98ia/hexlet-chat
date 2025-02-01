import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import RegistrationForm from './RegistrationForm.jsx';
import registrationImage from '../assets/registration.jpg';

function RegistrationCard() {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Image src={registrationImage} alt="Registration image" roundedCircle />
          </Col>
          <Col>
            <RegistrationForm />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RegistrationCard;
