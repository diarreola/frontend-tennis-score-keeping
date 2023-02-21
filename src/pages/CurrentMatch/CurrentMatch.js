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
  updateGameScoreCallBack,
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
  // TODO: state for stats

  useEffect(() => {
    getMatchCallBack(matchId);
    displayAllPlayers(userId);
    getAllSetsCallBack(matchId); // after we update the game points, we call this*
    console.log('how many times here')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentSet(findCurrentSet());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  useEffect(() => {
    if (currentSet !== undefined) {
      if (Object.keys(currentSet).length !== 0){
        getAllGames(currentSet.id)  // after we 
        getAllStatsForSet(currentSet.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSet]);

  useEffect(() => {
    setCurrentGame(findCurrentGame());  // after we update the game points, we call this*
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);


  // clicking buttons -> call api in game routes update_game
  // d fault -> opponent wins point
  // winner -> wins point
  // u. error -> opponent wins point
  // f. error -> opponent wins points


  // 4. if a player wins match.no_of_gamesperset, then game is done  ** update score appropriately

  const continueCurrentGame = () => {
    console.log('current game', currentGame, currentGame.game_done)
    return !currentGame.game_done
  }

  // can continue to next game in the SAME set // Check if previous game is done 
  // retrieve all new stuff
  const nextGame = () => {
    if (currentGameNum < maxGameSets) {
      return true
    }
    return false // if false, we know we need to create a new set
  }

  // 
  const nextSet = () => {
    if (currentSetNum < maxNumSets) {  //set_done == True
      return true
    }
    return false

  }

  const updateGameScore = (playerAScore, playerBScore) => {
    currentGame.player_a_score = playerAScore;
    currentGame.player_b_score = playerBScore;
    setPlayerAPoints(playerAScore)
    setPlayerBPoints(playerBScore)
  }

  const createNewGame = () => {
    try {
      addGameForSet(currentSet.id, currentGame.game_number + 1)
      setCurrentGameNum(currentGame.game_number + 1)
      playerAPoints(0)
      playerBPoints(0)
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

  const updateGamePoints = () => {
    try {
      updateGameScoreCallBack(currentGame.id, playerAPoints, playerBPoints, currentSet.id)
    } catch(e) {
      console.log('error updating game points', e)
    }
  }
  console.log('playerASetWins', playerASetWins)
  console.log('playerBSetWins', playerBSetWins)
  // make sure its the updated currentSet
  const displaySetPoints = () => {
    if (playerASetWins.length === currentSetNum && playerBSetWins.length === currentSetNum) {
      const newPlayerASetWins = [...playerASetWins]
      const newPlayerBSetWins = [...playerBSetWins] //also want to grab match agsin!
      newPlayerASetWins[currentSetNum-1] = currentSet.player_a_games_won
      newPlayerBSetWins[currentSetNum-1] = currentSet.player_b_games_won
      setPlayerASetWins(newPlayerASetWins)
      setPlayerBSetWins(newPlayerBSetWins)
    } else {
      const newPlayerASetWins = [...playerASetWins]
      const newPlayerBSetWins = [...playerBSetWins] //also want to grab match agsin!
      newPlayerASetWins.push(currentSet.player_a_games_won)
      newPlayerBSetWins.push(currentSet.player_b_games_won)
      setPlayerASetWins(newPlayerASetWins) //currentSet.player_a_games_won
      setPlayerBSetWins(newPlayerBSetWins) //currentSet.player_b_games_won
    }
  }

  // Button STUFF
  const onAceClick = (playerName) => {
    if (continueCurrentGame()) {
      incrementPoints(playerName)
    } else if (nextGame) {
      console.log('in here creating a new game within the same set ace click')
      updateGamePoints();
      createNewGame(); //set game points to 0 0
      getAllSetsCallBack(matchId);
      incrementPoints(playerName);
    } else if (nextSet) {
      console.log('in here cerating a new set ace click')
      updateGamePoints();
      createNewSet();
      getAllSetsCallBack(matchId);
      incrementPoints(playerName);
    } else {
      alert('Match is over')
    }
    displaySetPoints()
  }

  const incrementPoints = (playerName) => {
    const incrementedPointsA = playerAPoints + 1;
    const incrementedPointsB = playerBPoints + 1;
    if (playerAName === playerName) {
      updateGameScore(incrementedPointsA, playerBPoints) 
    } else {
      updateGameScore(playerAPoints, incrementedPointsB)
    }
  }

  console.log('playerA points2', playerAPoints)
  console.log('playerA points2', playerBPoints)

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
