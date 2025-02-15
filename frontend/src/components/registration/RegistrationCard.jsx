import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RegistrationForm from './RegistrationForm.jsx';
import registrationImage from '../../assets/registration.jpg';

const RegistrationCard = () => {
  const { t } = useTranslation();
  return (
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
        <span>{t('registrationCard.text')}</span>
        <Link to="/login">{t('registrationCard.link')}</Link>
      </Card.Footer>
    </Card>
  );
};

export default RegistrationCard;
