import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFoundCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="text-center p-4">
            {t('notFoundError')}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NotFoundCard;
