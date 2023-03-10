/* eslint-disable camelcase */
import './App.css';
import { React, useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorModal from './components/ErrorModal';
import MatchStats from './pages/MatchStats/MatchStats';
import CurrentMatch from './pages/CurrentMatch/CurrentMatch';
import axios from 'axios';

const kBaseUrl = 'https://tennis-pal-backend.herokuapp.com/';

const transformPlayerResponse = (player) => {
  const {
    first_name: firstName,
    last_name: lastName,
    serve_style: serveStyle,
    date_of_birth: dob,
    id
  } = player;
  return { firstName, lastName, serveStyle, dob, id };
};

const registerUser = (userData) => {
  const requestBody = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    password: 'hidden'
  }

  return axios
    .post(`${kBaseUrl}users/user`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const registerPlayer = (playerData, currentUser) => {
  const requestBody = {
    first_name: playerData.firstName,
    last_name: playerData.lastName,
    date_of_birth: playerData.dob,
    serve_style: playerData.serveStyle,
    utr: playerData.utr
  }

  return axios
    .post(`${kBaseUrl}users/${currentUser}/player`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const registerNewMatch = (newMatchData, currentUser) => {
  const requestBody = {
    match_name: newMatchData.matchName,
    no_of_gamesperset: newMatchData.numGames,
    no_of_sets: newMatchData.numSets,
    player_a_id: newMatchData.playerA,
    player_b_id: newMatchData.playerB
  }

  return axios
    .post(`${kBaseUrl}users/${currentUser}/match`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const registerNewSet = (matchId, setNum) => {
  const requestBody = {
    set_number: setNum
  }

  return axios
    .post(`${kBaseUrl}matches/${matchId}/set`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const registerNewGame = (setId, gameNum) => {
  const requestBody = {
    game_number: gameNum
  }

  return axios
    .post(`${kBaseUrl}sets/${setId}/game`, requestBody)
    .then((response) => {
      console.log('register new game', response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const fetchMatchById = (matchId) => {
  return axios
    .get(`${kBaseUrl}matches/${matchId}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const fetchAllPlayersByUser = (currentUser) => {
  return axios
    .get(`${kBaseUrl}users/${currentUser}/players`)
    .then((response) => {
      return response.data.map(transformPlayerResponse)
    })
    .catch((error) => {
      console.log(error);
    });
}

const fetchAllSetsFromMatchId = (matchId) => {
  return axios
    .get(`${kBaseUrl}matches/${matchId}/sets`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchAllGamesFromSetId = (setId) => {
  return axios
    .get(`${kBaseUrl}sets/${setId}/games`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateGameScore = (gameId, playerAScore, playerBScore, setId) => {
  const requestBody = {
    player_a_score: playerAScore,
    player_b_score: playerBScore,
    set_id: setId
  }

  return axios
    .put(`${kBaseUrl}games/${gameId}`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateSet = (setId, playerAGamesWon, playerBGamesWon, setWinner) => {
  const requestBody = {
    player_a_games_won: playerAGamesWon,
    player_b_games_won: playerBGamesWon,
    set_winner: setWinner
  }

  return axios
    .put(`${kBaseUrl}sets/${setId}`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const registerStatForSet = (setId, aces, doubleFaults, 
    forcedErrors, playerId, unforcedErrors, winners) => {
  const requestBody = {
    aces: aces,
    double_faults: doubleFaults,
    forced_errors: forcedErrors,
    player_id: playerId,
    unforced_errors: unforcedErrors,
    winners: winners
  }

  return axios
    .post(`${kBaseUrl}sets/${setId}/stat`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const fetchAllStatsFromSet = (setId) => {
  return axios
    .get(`${kBaseUrl}sets/${setId}/stats`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateStatForSet = (statId, aces, doubleFaults, 
    forcedErrors, playerId, unforcedErrors, winners, setId, setWon) => {
  const requestBody = {
    aces: aces,
    double_faults: doubleFaults,
    forced_errors: forcedErrors,
    player_id: playerId, 
    unforced_errors: unforcedErrors,
    winners: winners,
    set_id: setId,
    set_won: setWon
  }

  return axios
    .put(`${kBaseUrl}stats/${statId}`, requestBody)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [sets, setSets] = useState([]);  //set to empty when the match is over
  const [games, setGames] = useState([]);  //set to empty when set is over and match is over
  const [stats, setStats] = useState([]); //set to empty when set is over and match is over
  const [showModal, setShowModal] = useState({ show: false, message: '' });
  const navigate = useNavigate();
  const handleClose = () => setShowModal({ show: false, message: '' });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

  const addPlayers = (newPlayer, userId) => {
    registerPlayer(newPlayer, userId)
    .then((newPlayerData) => {

      const newPlayers = [...players];
      newPlayers.push({
        id: newPlayerData.Player_id,
        firstName: newPlayer.firstName,
        lastName: newPlayer.lastName,
        dob: newPlayer.dob,
        utr: newPlayer.utr,
        serveStyle: newPlayer.serveStyle
      });
      setPlayers(newPlayers);
    })
    .catch((error) => {
      console.log(error);
      handleShow('Cannot create player')
    });
  };

  const addMatch = (newMatch, userId) => {
    registerNewMatch(newMatch, userId)
    .then((newMatchData) => {

      const newMatches = [...matches];
      newMatches.push({
        id: newMatchData.New_match_id,
        playerA: newMatch.playerA,
        playerB: newMatch.playerB,
        numSets: newMatch.numSets,
        numGames: newMatch.numGames,
        matchName: newMatch.matchName
      });
      setMatches(newMatches);
      addSetForMatch(newMatchData.New_match_id, 1, 1, newMatch.playerA, newMatch.playerB)
      navigate(`/currentmatch/${userId}/match/${newMatchData.New_match_id}`);
    })
    .catch((error) => {
      console.log(error);
      handleShow('Cannot create current match')
    });
  };

  // adds set, init game, and init stats both players for a single match
  const addSetForMatch = (matchId, setNum, gameNum, playerAId, playerBId) => {
    registerNewSet(matchId, setNum)
    .then((newSetData) => {
      console.log('CREATED NEW SET', newSetData)
      // TODO: NEEDS TO BE SET OBJECT, rn its a single id
      const newSets = [...sets];
      newSets.push(newSetData);
      setGames(newSets);

      addGameForSet(newSetData.id, gameNum)
      addStatForSet(newSetData.id, 0, 0, 
        0, playerAId, 0, 0)
        addStatForSet(newSetData.id, 0, 0, 
          0, playerBId, 0, 0)
    })
    .catch((error) => {
      handleShow('Cant create a set, try creating another match')
    })
  };

  const addGameForSet = (setId, gameNum) => {
    registerNewGame(setId, gameNum)
    .then((newGameData) => {
      const newGames = [...games];
      newGames.push(newGameData);
      setGames(newGames);
    })
    .catch((error) => {
      handleShow('Cant create a game, try creating another match')
    })
  }

  const addStatForSet = (setId, aces, doubleFaults, 
    forcedErrors, playerId, unforcedErrors, winners) => {
    registerStatForSet(setId, aces, doubleFaults, 
      forcedErrors, playerId, unforcedErrors, winners)
      .then((newStatData) => {
        setStats(newStatData)
      })
      .catch((error) => {
        handleShow('Cant create a stat for a set')
      })
  }

  const updateGameScoreCallBack = (gameId, playerAScore, playerBScore, setId) => {
    updateGameScore(gameId, playerAScore, playerBScore, setId)
    .then((newGameData) => {
      console.log('updated game', newGameData)
      const newGames = [];

      for (const game of games) {
        if (game.id !== newGameData.id) {
          newGames.push(game)
        }
      }

      newGames.push({
        id: newGameData.id,
        set_id: newGameData.set_id,
        game_done: newGameData.game_done,
        game_number: newGameData.game_number,
        game_winner: newGameData.game_winner,
        player_a_score: newGameData.player_a_score,
        player_b_score: newGameData.player_b_score
      });
      setGames(newGames);
    })
    .catch((error) => {
      handleShow('Cant update game score')
    })
  }

  const getPlayerNameFromId = (playerId) => {
    let playerName = '';
    for (const player of players) {
      if (player.id === playerId) {
        playerName = player.firstName + ' ' + player.lastName
        return playerName
      }
    }
  };

  const addUser = (newUser) => {
    registerUser(newUser)
      .then((newUserData) => {
        navigate(`/dashboard/${newUserData.user_id}`);
      })
      .catch((error) => {
        console.log(error);
        handleShow('Cannot create user');
      });
  };

  const displayAllPlayers = (userId) => {
    fetchAllPlayersByUser(userId).then((players) => {
      setPlayers(players);
    });
  };

  const getMatch = (matchId) => {
    fetchMatchById(matchId).then((match) => {
      setCurrentMatch(match);
    });
  };

  const getAllSets = (matchId) => {
    fetchAllSetsFromMatchId(matchId).then((sets) => {
      console.log('get all sets', sets)
      setSets(sets)
    })
  }

  const getAllStatsForSet = (setId) => {
    fetchAllStatsFromSet(setId).then((stats) => {
      setStats(stats)
    })
  }

  const findCurrentSet = () => {
    if (sets.length === 0){
      return {}
    } else {
      return sets[sets.length-1]
    }

    // for (const set of sets) {
    //   if (set.set_done === false) {
    //     return set
    //   }
    // }
  };

  const getAllGames = (setId) => {
    fetchAllGamesFromSetId(setId).then((games) => {
      setGames(games)
    })
  }

  const findCurrentGame = () => {
    if (games.length === 0){
      return {}
    } else {
      return games[games.length-1]
    }
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<SignIn onHandleShow={handleShow}/>} />
          <Route path='/signup' element={<SignUp
            addUserCallBack={addUser}
            onHandleShow={handleShow}/>} />
          <Route path='/dashboard/:userId' element={
            <ProtectedRoute>
              <Dashboard
                displayAllPlayers={displayAllPlayers}
                getPlayerNameFromId={getPlayerNameFromId}
                addPlayersCallBack={addPlayers}
                addMatchCallBack={addMatch}
                matches={matches}
                players={players}/>
            </ProtectedRoute>}/>
            <Route path='/matchstats' element={<ProtectedRoute><MatchStats /></ProtectedRoute>} />
            <Route path='/currentmatch/:userId/match/:matchId' element={<ProtectedRoute><CurrentMatch
                match={currentMatch}
                sets={sets}
                games={games}
                stats={stats}
                updateGameScoreCallBack={updateGameScoreCallBack}
                addSetForMatch={addSetForMatch}
                addGameForSet={addGameForSet}
                getAllStatsForSet={getAllStatsForSet}
                getAllGames={getAllGames}
                findCurrentGame={findCurrentGame}
                findCurrentSet={findCurrentSet}
                getAllSetsCallBack={getAllSets}
                getMatchCallBack={getMatch}
                getPlayerNameFromId={getPlayerNameFromId}
                displayAllPlayers={displayAllPlayers}/></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
      <ErrorModal showModal={showModal} onHandleClose={handleClose} />
    </div>
  );
}

export default App;
