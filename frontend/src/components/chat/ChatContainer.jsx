import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChannelsPanel from './ChannelsPanel.jsx';
import ChatPannel from './ChatPanel.jsx';

const ChatContainer = () => (
  <Container className="h-100 bg-white rounded shadow">
    <Row className="h-100 flex-md-row">
      <Col xs={4} md={2} className="h-100 p-0 border-end bg-light d-flex flex-column">
        <ChannelsPanel />
      </Col>
      <Col className="p-0 h-100 d-flex flex-column">
        <ChatPannel />
      </Col>
    </Row>
  </Container>
);

export default ChatContainer;
