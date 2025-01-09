import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
   return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hextlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
   ); 
};

export default Header;
