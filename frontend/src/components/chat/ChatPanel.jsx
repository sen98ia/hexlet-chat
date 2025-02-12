import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ChatForm from './ChatForm.jsx';
import { getMessages, addMessage } from '../../store/api/messagesApi.js';

const ChatPannel = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const { data: messages, isLoading, refetch } = getMessages();
  const [add] = addMessage();

  const handleAddMessage = (id, text, name) => {
    add({ body: text, username: name, channelId: id });
    refetch();
  };

  if (isLoading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const messagesCount = messages.filter(({ channelId }) => activeChannel.id === channelId).length;

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
              <span>
                {messagesCount}
                {' '}
                сообщений
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="overflow-auto">
        <Col className="mx-md-5 flex-column">
          {messages && messages.filter(({ channelId }) => channelId === activeChannel.id)
            .map((message) => (
              <Container key={message.id} className="text-break mb-2">
                <b>{message.username}</b>
                :
                {' '}
                {message.body}
              </Container>
            ))}
        </Col>
      </Row>
      <Row className="mt-auto">
        <Col className="mx-md-5 my-2">
          <ChatForm
            submitHandler={handleAddMessage}
            channelId={activeChannel.id}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPannel;
