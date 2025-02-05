import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { getChannels } from '../store/api/channelsApi.js';

const ChannelsPanel = () => {
  const { data: channels, isLoading, refetch } = getChannels();

  if (isLoading) {
    return <div>жду</div>;
  }

  return (
    <Container className="border-end">
      <Row>
        <Col><b>Каналы</b></Col>
        <Col><Button variant="outline-primary" size="sm">+</Button></Col>
      </Row>
      <Row>
        <Nav defaultActiveKey="/home" className="flex-column">
          {channels.map((channel) => (
            <Nav.Item key={channel.id}>
              <Nav.Link eventKey={channel.id}>{channel.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Row>
    </Container>
  );
};

export default ChannelsPanel;
