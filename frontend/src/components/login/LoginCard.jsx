import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm.jsx';
import loginImage from '../../assets/login.jpg';
import routes from '../../routes.js';

const LoginCard = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Body className="p-5">
        <Row>
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <Image src={loginImage} alt="Login image" roundedCircle />
          </Col>
          <Col>
            <LoginForm />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-center p-4">
        <span>{t('loginCard.text')}</span>
        <Link to={routes.pages.signUp()}>{t('loginCard.link')}</Link>
      </Card.Footer>
    </Card>
  );
};

export default LoginCard;
