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
  console.log('in api call')
  return axios
    .get(`${kBaseUrl}matches/${matchId}/sets`)
    .then((response) => {
      console.log('response data', response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
};


function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [sets, setSets] = useState([]);  //set to empty when the match is over
  const [games, setGames] = useState({});  //set to empty when set is over and match is over
  // const [currentSet, setCurrentSet] = useState({});
  const [currentGame, setCurrentGame] = useState({});
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

  // also add a set and game :)
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
      addSetForMatch(newMatchData.New_match_id, 1, 1)
      navigate(`/currentmatch/${userId}/match/${newMatchData.New_match_id}`);
    })
    .catch((error) => {
      console.log(error);
      handleShow('Cannot create current match')
    });
  };

  // Add set and game
  const addSetForMatch = (matchId, setNum, gameNum) => {
    registerNewSet(matchId, setNum)
    .then((newSetData) => {
      console.log('newsetdata', newSetData)
      // setCurrentSet(newSetData)
      addGameForSet(newSetData.Set_id, gameNum)
    })
    .catch((error) => {
      handleShow('Cant create a set, try creating another match')
    })
  };

  const addGameForSet = (setId, gameNum) => {
    registerNewGame(setId, gameNum)
    .then((newGameData) => {
      console.log('newgamedata', newGameData)
      setCurrentGame(newGameData)
    })
    .catch((error) => {
      handleShow('Cant create a game, try creating another match')
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
      console.log('sets inside', sets)
      setSets(sets)
    })
  }

  const findCurrentSet = () => {
    for (const set of sets) {
      if (set.set_done === false) {
        return set
      }
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
                // currentSet={currentSet}
                currentGame={currentGame}
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
