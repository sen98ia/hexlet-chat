import { Spinner, Container } from 'react-bootstrap';

const SpinnerComponent = () => (
  <Container className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </Container>
);

export default SpinnerComponent;
