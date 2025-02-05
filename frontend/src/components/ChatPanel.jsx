import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChatForm from './ChatForm.jsx';

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
      <ChatForm />
    </Row>
  </Container>
);

export default ChatPannel;
