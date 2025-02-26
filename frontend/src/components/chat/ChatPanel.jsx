import { useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import ChatForm from './ChatForm.jsx';
import { getMessages, addMessage } from '../../store/api/messagesApi.js';
import { getActiveChannelIdSelector, getActiveChannelNameSelector } from '../../store/selectors/channelsSelectors.js';

const ChatPannel = () => {
  const activeChannelId = useSelector(getActiveChannelIdSelector);
  const activeChannelName = useSelector(getActiveChannelNameSelector);
  const {
    data: messages, isLoading, refetch,
  } = getMessages();
  const [add] = addMessage();

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    return messages.filter(({ channelId }) => channelId === activeChannelId);
  }, [messages, activeChannelId]);

  const messagesCount = useMemo(() => filteredMessages.length, [filteredMessages]);

  const { t } = useTranslation();

  const handleAddMessage = async (id, text, name) => {
    await add({ body: text, username: name, channelId: id });
    refetch();
  };

  if (isLoading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="d-flex flex-column h-100 m-0">
      <Row className="bg-light mb-4 p-3 shadow-sm small">
        <Col>
          <Row>
            <Col>
              <span className="me-1"><b>#</b></span>
              <b>{activeChannelName}</b>
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
          {filteredMessages && filteredMessages.map((message) => (
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
            channelId={activeChannelId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPannel;
