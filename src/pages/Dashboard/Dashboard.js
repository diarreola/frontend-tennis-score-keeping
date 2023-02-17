import './Dashboard.css';
import NewMatchForm from './NewMatchForm';
import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList';
import PastMatchesTable from './PastMatchesTable'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserNavbar from '../../components/UserNavbar';

function Dashboard({matches, players, addPlayersCallBack, addMatchCallBack, getPlayerNameFromId}) {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <section>
      <div className="Dashboard">
        <Container fluid>
          <Row>
            <Col sm><NewMatchForm addMatchCallBack={addMatchCallBack} players={players}/></Col>
            <Col sm><PlayerForm addPlayersCallBack={addPlayersCallBack}/></Col>
            <Col sm><PlayerList players={players}/></Col>
          </Row>
          <Row>
            <Col sm><PastMatchesTable getPlayerNameFromId={getPlayerNameFromId} matches={matches}/></Col>
          </Row>
        </Container>
      </div>
      </section>
    </div>
  );
}

export default Dashboard;