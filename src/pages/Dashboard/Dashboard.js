import NewMatchForm from './NewMatchForm';
import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList';
import PastMatchesTable from './PastMatchesTable'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';

function Dashboard({matches, players, addPlayersCallBack, addMatchCallBack, getPlayerNameFromId}) {
  const { user, logout } = UserAuth();
  console.log('user', user)
  console.log('logout', logout)
  const navigate = useNavigate();

  const onHandleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message)
    }
  };

  return (
    <div>
      <UserNavbar user={user} onHandleLogout={onHandleLogout}></UserNavbar>
      {/* <button onClick={onHandleLogout} className='user-logout'>logout</button>  */}
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