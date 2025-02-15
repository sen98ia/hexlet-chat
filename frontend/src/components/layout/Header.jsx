import { Navbar, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('header.title')}</Navbar.Brand>
        {auth.isAuth && <Button variant="primary" onClick={auth.handleLogOut}>{t('header.logOut')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
