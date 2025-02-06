import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChannelsPanel from './ChannelsPanel.jsx';
import ChatPannel from './ChatPanel.jsx';

const ChatContainer = () => (
  <Container>
    <Row>
      <Col md={2}>
        <ChannelsPanel />
      </Col>
      <Col>
        <ChatPannel />
      </Col>
    </Row>
  </Container>
);

export default ChatContainer;
