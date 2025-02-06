import { Navbar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';

const Header = () => {
  const auth = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.isAuth && <Button variant="primary" onClick={auth.handleLogOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
