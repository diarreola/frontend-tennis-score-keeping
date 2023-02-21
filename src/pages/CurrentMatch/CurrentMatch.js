import {React, useEffect, useState} from 'react';
import UserNavbar from '../../components/UserNavbar';
import MatchButtons from './MatchButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchControlFooter from './MatchControlFooter';
import MatchCourt from './MatchCourt';
import MatchScoreTable from './MatchScoreTable';
import { useParams } from 'react-router-dom';

const CurrentMatch = ({match, currentGame, sets, findCurrentSet,
  getAllSetsCallBack, getMatchCallBack, getPlayerNameFromId, 
  displayAllPlayers}) => {
  const { userId, matchId } = useParams();
  const [currentSetNum, setCurrentSetNum] = useState(1);
  const [currentGameNum, setCurrentGameNum] = useState(1);

  const maxNumSets = match.no_of_sets;
  const maxGameSets = match.no_of_gamesperset;

  // console.log('currentgame', currentGame)
  console.log('all sets', sets)

  const currentSet = findCurrentSet();
  console.log('current sets', currentSet)

  // keep track of:
  // total set, total games
  // state of current set and game we're on
  // can check if set or game is over! -> always set 
  // 

  // need to handle creating -> 
  // ace, first serve -> wins point
  // api call -> creates a single set -> will need to create sets one by one -> (match routesline 109, add_new_set_to_match)
  // for each set, create num games -> add_new game to set, set routes, 139

  // clicking buttons -> call api in game routes update_game
  // d fault -> opponent wins point
  // winner -> wins point
  // u. error -> opponent wins point
  // f. error -> opponent wins points

  // how will i know when a game is over -> response body fro api call

  useEffect(() => {
    getMatchCallBack(matchId);
    displayAllPlayers(userId);
    getAllSetsCallBack(matchId);
    // inside, find the current set! based off of latest id then find current game
    // get all sets based on match_id
    // get all games based on set we are on
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