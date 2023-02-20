import {React, useEffect} from 'react';
import UserNavbar from '../../components/UserNavbar';
import MatchButtons from './MatchButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchControlFooter from './MatchControlFooter';
import MatchCourt from './MatchCourt';
import MatchScoreTable from './MatchScoreTable';
import { useParams } from 'react-router-dom';

const CurrentMatch = ({match, getMatchCallBack, getPlayerNameFromId, displayAllPlayers}) => {
  const { userId, matchId } = useParams();

  useEffect(() => {
    getMatchCallBack(matchId);
    displayAllPlayers(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playerAName = getPlayerNameFromId(match.player_a_id)
  const playerBName = getPlayerNameFromId(match.player_b_id)
  return (
    <div>
      <UserNavbar></UserNavbar>
      
      <Container>
        <Row>
          <Col><MatchScoreTable
            match={match}
            playerA={playerAName}
            playerB={playerBName}>
            </MatchScoreTable></Col>
        </Row>
        <Row>
          <Col><MatchCourt /></Col>
        </Row>
        <Row>
          <Col><MatchButtons
              playerName={playerAName}/></Col>
          <Col><MatchButtons
              playerName={playerBName}/></Col>
        </Row>
      </Container>
      <MatchControlFooter></MatchControlFooter>
    </div>
  )
};

export default CurrentMatch;