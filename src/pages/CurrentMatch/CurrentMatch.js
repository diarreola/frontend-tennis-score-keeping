import { React, useEffect, useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import MatchButtons from './MatchButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchControlFooter from './MatchControlFooter';
import MatchCourt from './MatchCourt';
import MatchScoreTable from './MatchScoreTable';
import { useParams } from 'react-router-dom';

const CurrentMatch = ({
  match,
  sets,
  games,
  findCurrentGame,
  findCurrentSet,
  getAllGames,
  getAllSetsCallBack,
  getMatchCallBack,
  getPlayerNameFromId,
  displayAllPlayers }) => {
  const { userId, matchId } = useParams();
  const [currentSetNum, setCurrentSetNum] = useState(1);
  const [currentGameNum, setCurrentGameNum] = useState(1);
  // store state of current set and game
  const [currentSet, setCurrentSet] = useState({});
  const [currentGame, setCurrentGame] = useState({});

  const maxNumSets = match.no_of_sets;
  const maxGameSets = (match.no_of_gamesperset * 2) - 1;
  const playerAName = getPlayerNameFromId(match.player_a_id);
  const playerBName = getPlayerNameFromId(match.player_b_id);

  useEffect(() => {
    getMatchCallBack(matchId);
    displayAllPlayers(userId);
    getAllSetsCallBack(matchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentSet(findCurrentSet());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  useEffect(() => {
    if (currentSet !== undefined) {
      if (Object.keys(currentSet).length !== 0){
        getAllGames(currentSet.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSet]);

  useEffect(() => {
    setCurrentGame(findCurrentGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  // keep track of:
  // total set, total games
  // need to manually end games and set
  // state of current set and game we're on
  // can check if set or game is over! -> always set
  // NEED TO 

  // IF the game is done, check if there are any more games to do
    // no more games: check if we can go to the next set
      // if we can go to the next set, update previous set to DONE, and go to next set, game is 0
      // if no more next set or game: END
    // if there are games 

  // after every update, we need to check if its done????

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

  return (
    <div>
      <UserNavbar></UserNavbar>

      <Container>
        <Row>
          <Col>
            <MatchScoreTable
              match={match}
              playerA={playerAName}
              playerB={playerBName}
            ></MatchScoreTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <MatchCourt />
          </Col>
        </Row>
        <Row>
          <Col>
            <MatchButtons playerName={playerAName} />
          </Col>
          <Col>
            <MatchButtons playerName={playerBName} />
          </Col>
        </Row>
      </Container>
      <MatchControlFooter></MatchControlFooter>
    </div>
  );
};

export default CurrentMatch;
