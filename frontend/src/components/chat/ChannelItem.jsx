import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const СhannelItem = ({ channel }) => {
  if (!channel.removable) {
    return (
      <Nav.Item className="w-100">
        <Nav.Link eventKey={channel.name} className="w-100 text-start text-truncate">
          <span className="me-1">#</span>
          {channel.name}
        </Nav.Link>
      </Nav.Item>
    );
  }
  return (
    <Dropdown split as={ButtonGroup} className="w-100">
      <Button as={Nav.Link} eventKey={channel.name} className="w-100 text-start text-truncate">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle drop="down-center" split />
      <Dropdown.Menu drop="down-centered">
        <Dropdown.Item>Удалить</Dropdown.Item>
        <Dropdown.Item>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default СhannelItem;
