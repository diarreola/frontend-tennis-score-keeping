/* eslint-disable camelcase */
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
  stats,
  addSetForMatch,
  addGameForSet,
  findCurrentGame,
  findCurrentSet,
  getAllGames,
  getAllStatsForSet,
  getAllSetsCallBack,
  getMatchCallBack,
  getPlayerNameFromId,
  displayAllPlayers }) => {
  const { userId, matchId } = useParams();
  const [currentSetNum, setCurrentSetNum] = useState(1);
  const [currentGameNum, setCurrentGameNum] = useState(1);
  const [currentSet, setCurrentSet] = useState({});
  const [currentGame, setCurrentGame] = useState({});
  const [playerAPoints, setPlayerAPoints] = useState(0);
  const [playerBPoints, setPlayerBPoints] = useState(0);
  const maxNumSets = match.no_of_sets;
  const maxGameSets = (match.no_of_gamesperset * 2) - 1;
  const [playerASetWins, setPlayerASetWins] = useState([]);
  const [playerBSetWins, setPlayerBSetWins] = useState([]);
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
        getAllStatsForSet(currentSet.id)
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


  // different cases:
  // 4. if a player wins match.no_of_gamesperset, then game is done  ** update score appropriately

  // 
  const gameIsOn = () => {
    console.log('current game', currentGame, currentGame.game_done)

    return currentGame.game_done
  }

  // can continue to next game in the SAME set
  const nextGame = () => {
    if (currentGameNum < maxGameSets) {
      return true
    }
    return false // if false, we know we need to create a new set
  }

  const nextSet = () => {
    if (currentSetNum < maxNumSets) {
      return true
    }
    return false // wont go to next set

  }

  const updateGameScore = (currentGame, playerAScore, playerBScore) => {
    // playerAPoints
    currentGame.player_a_score = playerAScore;
    currentGame.player_b_score = playerBScore;
  }

  // we havent reached maxGameSets, we create a new game

  const createNewGame = () => {
    try {
      addGameForSet(currentSet.id, currentGame.game_number + 1)
      setCurrentGameNum(currentGame.game_number + 1)
    } catch(e) {
      console.log('error in creating new game, line 140', e)
    }
  }

  const createNewSet = () => {
    try {
      addSetForMatch(matchId, currentSet.set_number + 1, 1, match.player_a_id, match.player_b_id)
      setCurrentSetNum(currentSet.set_number + 1)
    } catch(e) {
      console.log('error in creating new set and game and stat', e)
    }

  }

  // helper function
  // 1. populate set values -> when does this happen? -> everytime someone wins a game?
  // 2. populate game points -> whenver we add/lose points


  // Button STUFF
  const onAceClick = (playerName) => {
    // need to know which player :)
    console.log('event', playerName)
    // const playerType = playerAName == playerName ? 'a' : 'b'
    // console.log('pt', playerType)

    // increment player score, set state
    // api call 
  }

  const onDFaultClick = (event) => {
    
  }

  const onWinnerClick = (event) => {
    
  }

  const onUErrorClick = (event) => {
    
  }

  const onFErrorClick = (event) => {
    
  } 

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
              playerAPoints={playerAPoints}
              playerBPoints={playerBPoints}
              playerASetWins={playerASetWins}
              playerBSetWins={playerBSetWins}
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
            <MatchButtons
              playerName={playerAName}
              onAceClick={onAceClick}
              onDFaultClick={onDFaultClick}
              onWinnerClick={onWinnerClick}
              onUErrorClick={onUErrorClick}
              onFErrorClick={onFErrorClick}/>
          </Col>
          <Col>
            <MatchButtons
              playerName={playerBName}
              onAceClick={onAceClick}
              onDFaultClick={onDFaultClick}
              onWinnerClick={onWinnerClick}
              onUErrorClick={onUErrorClick}
              onFErrorClick={onFErrorClick}/>
          </Col>
        </Row>
      </Container>
      <MatchControlFooter></MatchControlFooter>
    </div>
  );
};

export default CurrentMatch;
