import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChannelsPanel from './ChannelsPanel.jsx';

const ChatContainer = () => (
  <Container className="h-100 my-4 overflow-hidden shadow rounded">
    <Row className="h-100 bg-white flex-md-row">
      <Col>
        <ChannelsPanel />
      </Col>
      <Col>chat</Col>
    </Row>
  </Container>
);

export default ChatContainer;
