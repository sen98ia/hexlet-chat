import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ChatPannel = () => (
  <Container>
    <Row>
      <Container>
        <Row>
          <b>имя канала</b>
        </Row>
        <Row>
          <span>количество сообщений</span>
        </Row>
      </Container>
    </Row>
    <Row>
      для сообщений
    </Row>
    <Row>
      форма для отправки сообщений
    </Row>
  </Container>
);

export default ChatPannel;
