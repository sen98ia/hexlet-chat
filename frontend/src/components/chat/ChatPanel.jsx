import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChatForm from './ChatForm.jsx';
import { getChannels } from '../../store/api/channelsApi.js';

const ChatPannel = () => {
  const { data: channels, isLoading, refetch } = getChannels();

  return (
    <Container fluid className="d-flex flex-column h-100">
      <Row className="bg-light mb-4 p-3 shadow-sm small">
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
        Проверка работы dev 2
      </Row>
      <Row>
        <ChatForm />
      </Row>
    </Container>
  );
};

export default ChatPannel;
