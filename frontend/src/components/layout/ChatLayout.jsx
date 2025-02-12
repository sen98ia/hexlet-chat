import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header.jsx';

const ChatLayout = ({ children }) => (
  <Container className="h-100 d-flex flex-column" fluid>
    <Row>
      <Col className="p-0">
        <Header />
      </Col>
    </Row>
    <Row className="justify-content-center overflow-hidden align-content-center h-100">
      <Col className="h-100 py-4 px-0">
        {children}
      </Col>
    </Row>
  </Container>
);

export default ChatLayout;
