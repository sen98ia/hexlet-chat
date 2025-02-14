import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm.jsx';
import registrationImage from '../../assets/registration.jpg';

const RegistrationCard = () => (
  <Card>
    <Card.Body className="p-5">
      <Row>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Image src={registrationImage} alt="Login image" roundedCircle />
        </Col>
        <Col>
          <RegistrationForm />
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer className="text-center p-4">
      <span>Уже есть аккаунт? </span>
      <Link to="/login">Войти</Link>
    </Card.Footer>
  </Card>
);

export default RegistrationCard;
