import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

function NotFoundCard() {
  return (
    <Card>
      <Card.Body>
        <Row>
          Страница не найдена.
        </Row>
      </Card.Body>
    </Card>
  );
}

export default NotFoundCard;
