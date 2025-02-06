import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header.jsx';

const PageLayout = ({ children }) => (
  <Container fluid className="d-flex flex-column h-100">
    <Row>
      <Header />
    </Row>
    <Row className="justify-content-center align-content-center h-100">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </Row>
  </Container>
);

export default PageLayout;
