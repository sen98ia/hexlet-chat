import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hextlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
