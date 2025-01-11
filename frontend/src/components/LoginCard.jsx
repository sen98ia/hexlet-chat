import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from "./LoginForm.jsx";
import Image from 'react-bootstrap/Image';
import loginImage from '../assets/login.jpg';
import { Link } from 'react-router-dom';

const LoginCard = () => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
          <Image src={loginImage} alt='Login image' roundedCircle />
          </Col>
          <Col>
            <LoginForm/>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='text-center'>
        <span>Нет аккаунта? </span>
        <Link to='registration'>Регистрация</Link>
      </Card.Footer>
    </Card>
  );
};

export default LoginCard;
