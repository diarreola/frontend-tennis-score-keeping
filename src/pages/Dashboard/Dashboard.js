import NewMatchForm from './NewMatchForm';
import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard({players, addPlayersCallBack, addMatchCallBack}) {
  return (
    <div className="Dashboard">
      <Container fluid>
        <Row>
          <Col sm><NewMatchForm addMatchCallBack={addMatchCallBack} players={players}/></Col>
          <Col sm><PlayerForm addPlayersCallBack={addPlayersCallBack}/></Col>
          <Col sm><PlayerList players={players}/></Col>
        </Row>
        <Row>
          <Col sm>datatble</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;