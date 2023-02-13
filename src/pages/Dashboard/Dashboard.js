import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList';
import playersData from '../../data/player_data.json'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
  return (
    <div className="Dashboard">
      <Container fluid>
        <Row>
          <Col sm></Col>
          <Col sm><PlayerForm /></Col>
          <Col sm><PlayerList players={playersData}/></Col>
        </Row>
        <Row>
          <Col sm>datatble</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;