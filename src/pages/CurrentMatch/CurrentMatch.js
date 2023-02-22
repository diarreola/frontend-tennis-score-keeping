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
    getAllSetsCallBack(matchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
    const newSet = findCurrentSet();
    const newGame = findCurrentGame();
    console.log('new set true?', newSet.set_done, newGame.game_done)
    if (newSet.set_done === true && newGame.game_done === true) {
      createNewSet();
    }
    setCurrentSet(findCurrentSet());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  useEffect(() => {
    const newGame = findCurrentGame();
    if (newGame.game_done === true && currentGameNum < maxGameSets) {
      console.log('creating a new game')
      createNewGame();
    } else if (newGame.game_done === true && currentGameNum === maxGameSets) {
      setPlayerAPoints(0);
      setPlayerBPoints(0);
    }
    setCurrentGame(findCurrentGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  useEffect(() => {
    const newSet = findCurrentSet();
    const newGame = findCurrentGame();
    console.log('new set true?', newSet.set_done, newGame.game_done)
    if (playerAPoints === 0 && playerBPoints === 0) {
      if (newSet.set_done === true && newGame.game_done === true) {
        if (currentSetNum < maxNumSets) {
          console.log('cresate new set in use effect')
          createNewSet();
        } else {
          alert('match completed')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerAPoints]);

  // 4. if a player wins match.no_of_gamesperset, then game is done  ** update score appropriately

  const continueCurrentGame = () => {
    return !currentGame.game_done
  }

  const updateGameScore = (playerAScore, playerBScore) => {
    currentGame.player_a_score = playerAScore;
    currentGame.player_b_score = playerBScore;
    setPlayerAPoints(playerAScore)
    setPlayerBPoints(playerBScore)
  }

  const createNewGame = () => {
    try {
      setCurrentGameNum(currentGame.game_number + 1)
      addGameForSet(currentSet.id, currentGame.game_number + 1)
      setPlayerAPoints(0)
      setPlayerBPoints(0)
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

  const updateGamePointsSpecial = async (pointsA, pointsB) => {
    try {
      await updateGameScoreCallBack(currentGame.id, pointsA, pointsB, currentSet.id);
      await getAllSetsCallBack(matchId);

    } catch(e) {
      console.log('error updating game points', e)
    }
  }

  const displaySetPoints = () => {
    if (playerASetWins.length === currentSetNum && playerBSetWins.length === currentSetNum) {
      const newPlayerASetWins = [...playerASetWins]
      const newPlayerBSetWins = [...playerBSetWins] //also want to grab match agsin!
      console.log('display points a and b', currentSet.player_a_games_won, currentSet.player_b_games_won)
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

  const onAceClick = async (playerName) => {
    console.log('currentgame inside aceclick', currentGame)
    if (continueCurrentGame()) {
      incrementPoints(playerName);
    } 
    // displaySetPoints()
  }

  const incrementPoints = (playerName) => {
    const incrementedPointsA = playerAPoints + 1;
    const incrementedPointsB = playerBPoints + 1;
    if (playerAName === playerName) {
      updateGameScore(incrementedPointsA, playerBPoints)
      updateGamePointsSpecial(incrementedPointsA, playerBPoints)
    } else {
      updateGameScore(playerAPoints, incrementedPointsB)
      updateGamePointsSpecial(playerAPoints, incrementedPointsB)
    }
  }

  const onDFaultClick = (playerName) => {
    // d fault -> opponent wins point
    const opppositePlayer = playerAName === playerName ? playerBName : playerAName
    if (continueCurrentGame()) {
      incrementPoints(opppositePlayer);
    } 
  }

  const onWinnerClick = (playerName) => {
    // winner -> wins point
    if (continueCurrentGame()) {
      incrementPoints(playerName);
    } 
  }

  const onUErrorClick = (playerName) => {
    // u. error -> opponent wins point
    const opppositePlayer = playerAName === playerName ? playerBName : playerAName
    if (continueCurrentGame()) {
      incrementPoints(opppositePlayer);
    } 
  }

  const onFErrorClick = (playerName) => {
    // f. error -> opponent wins points
    const opppositePlayer = playerAName === playerName ? playerBName : playerAName
    if (continueCurrentGame()) {
      incrementPoints(opppositePlayer);
    } 
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
