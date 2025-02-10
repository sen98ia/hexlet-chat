import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatForm from './ChatForm.jsx';

const ChatPannel = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  return (
    <Container fluid className="d-flex flex-column h-100">
      <Row className="bg-light mb-4 p-3 shadow-sm small">
        <Container>
          <Row>
            <Col>
              <span className="me-1">#</span>
              <b>{activeChannel.name}</b>
            </Col>
          </Row>
          <Row>
            <span>количество сообщений</span>
          </Row>
        </Container>
      </Row>
      <Row>
        test dev
      </Row>
      <Row>
        <ChatForm />
      </Row>
    </Container>
  );
};

export default ChatPannel;
