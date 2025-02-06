import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import loginImage from '../../assets/login.jpg';

const LoginCard = () => (
  <Card>
    <Card.Body className="p-5">
      <Row>
        <Col className="text-center">
          <Image src={loginImage} alt="Login image" roundedCircle />
        </Col>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer className="text-center p-4">
      <span>Нет аккаунта? </span>
      <Link to="/registration">Регистрация</Link>
    </Card.Footer>
  </Card>
);

export default LoginCard;
