import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header.jsx';

function PageLayout({ children }) {
  return (
    <Container fluid className="h-100 d-flex flex-column">
      <Row>
        <Header />
      </Row>
      <Row className="h-100">
        <Col className="d-flex justify-content-center align-items-center h-100">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default PageLayout;
