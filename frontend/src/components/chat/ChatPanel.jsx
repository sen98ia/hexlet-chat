import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatForm from './ChatForm.jsx';

const ChatPannel = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  return (
    <Container fluid className="d-flex flex-column h-100 m-0">
      <Row className="bg-light mb-4 p-3 shadow-sm small">
        <Col>
          <Row>
            <Col>
              <span className="me-1"><b>#</b></span>
              <b>{activeChannel.name}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>количество сообщений</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="overflow-auto">
        <Col className="mx-md-5">
          test dev
        </Col>
      </Row>
      <Row className="mt-auto">
        <Col className="mx-md-5">
          <ChatForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPannel;
