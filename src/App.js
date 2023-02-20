/* eslint-disable camelcase */
import './App.css';
import { React, useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import {Routes, Route, useNavigate, useParams } from 'react-router-dom';
// import playersData from './data/player_data.json'
// import matchesData from './data/past_matches.json'
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

  console.log('requestBody', requestBody)
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

  console.log('requestBody', requestBody)
  console.log('currentuser', currentUser)
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

  console.log('requestBody', requestBody)
  console.log('currentuser', currentUser)
  return axios
    .post(`${kBaseUrl}users/${currentUser}/match`, requestBody)
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
      console.log('res', response.data)
      return response.data.map(transformPlayerResponse)
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState({ show: false, message: '' });
  const navigate = useNavigate();
  const handleClose = () => setShowModal({ show: false, message: '' });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

  const addPlayers = (newPlayer, userId) => {
    registerPlayer(newPlayer, userId)
    .then((newPlayerData) => {

      const newPlayers = [...players];

      console.log('newPlayerData.player_id', newPlayerData.Player_id);
      newPlayers.push({
        id: newPlayerData.Player_id,
        firstName: newPlayer.firstName,
        lastName: newPlayer.lastName,
        dob: newPlayer.dob,
        utr: newPlayer.utr,
        serveStyle: newPlayer.serveStyle
      });
      console.log('newplayer array', newPlayers)
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

      console.log('newMAtchData', newMatchData);
      newMatches.push({
        id: newMatchData.New_match_id,
        playerA: newMatch.playerA,
        playerB: newMatch.playerB,
        numSets: newMatch.numSets,
        numGames: newMatch.numGames,
        matchName: newMatch.matchName
      });
      setMatches(newMatches);
      return newMatchData.New_match_id
    })
    .catch((error) => {
      console.log(error);
      handleShow('Cannot create current match')
    });

  };

  const getPlayerNameFromId = (playerId) => {
    let playerName = '';
    for (const player of players) {
      if (player.id === playerId) {
        playerName = player.first_name + ' ' + player.last_name
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
      console.log('players', players)
      setPlayers(players);
    });
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
            <Route path='/currentmatch/:userId/match/:matchId' element={<ProtectedRoute><CurrentMatch /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
      <ErrorModal showModal={showModal} onHandleClose={handleClose} />
    </div>
  );
}

export default App;
