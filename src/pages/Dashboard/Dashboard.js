import './Dashboard.css';
import NewMatchForm from './NewMatchForm';
import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList';
import PastMatchesTable from './PastMatchesTable'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserNavbar from '../../components/UserNavbar';
import { useParams } from 'react-router-dom';
import { React, useEffect } from 'react';


function Dashboard({matches, players, displayAllPlayers, addPlayersCallBack, addMatchCallBack, getPlayerNameFromId}) {
  const { userId } = useParams();

  useEffect(() => {
    displayAllPlayers(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <UserNavbar></UserNavbar>
      <section>
      <div className="Dashboard">
        <Container fluid>
          <Row>
            <Col sm><NewMatchForm userId={userId} addMatchCallBack={addMatchCallBack} players={players}/></Col>
            <Col sm><PlayerForm userId={userId} addPlayersCallBack={addPlayersCallBack}/></Col>
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