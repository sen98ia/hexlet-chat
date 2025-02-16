import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import ChatForm from './ChatForm.jsx';
import { getMessages, addMessage } from '../../store/api/messagesApi.js';

const ChatPannel = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const {
    data: messages, isLoading, isFetching, isSuccess, refetch,
  } = getMessages();
  const [add, { isLoading: load, isSuccess: succ, isError: err }] = addMessage();

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const { t } = useTranslation();

  const handleAddMessage = (id, text, name) => {
    add({ body: text, username: name, channelId: id });
    refetch();
    console.log('новое сообщение');
  };

  if (isLoading) {
    console.log('isLoading...chat');
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (isFetching) {
    console.log('isFetching chat');
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  console.log(isSuccess);
  console.log(`load ${load}`);
  console.log(`err ${err}`);
  console.log(`succ ${succ}`);

  const messagesCount = messages.filter(({ channelId }) => activeChannel.id === channelId).length;
  console.log(messages);

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
                {t('messagesCount.count', { count: messagesCount })}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="overflow-auto" ref={scrollRef}>
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
