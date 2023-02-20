/* eslint-disable camelcase */
import './App.css';
import { React, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import {Routes, Route, useNavigate } from 'react-router-dom'
// import playersData from './data/player_data.json'
import matchesData from './data/past_matches.json'
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorModal from './components/ErrorModal';
import MatchStats from './pages/MatchStats/MatchStats';
import CurrentMatch from './pages/CurrentMatch/CurrentMatch';
import axios from 'axios';

const kBaseUrl = 'https://tennis-pal-backend.herokuapp.com/';

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

function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState(matchesData);
  const [currentUser, setCurrentUser] = useState(0);  // access only for creating a match and player
  const [showModal, setShowModal] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleClose = () => setShowModal({ show: false, message: '' });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

  const addPlayers = (newPlayer) => {

    registerPlayer(newPlayer, currentUser)
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

  const addMatch = (newMatchData) => {
    const newMatch = {
      player_a: newMatchData.playerA,
      player_b: newMatchData.playerB,
      no_of_sets: newMatchData.numSets,
      no_of_gamesperset: newMatchData.numGames,
      match_name: newMatchData.matchName
    };

    const newMatches = [...matches];
    newMatches.push(newMatch);
    setMatches(newMatches);

    // only navigate if it works
    navigate('/currentmatch');

    // when api call works, navigate to currentmatch
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
        console.log('newUserData', newUserData)
        setCurrentUser(newUserData.user_id);
      })
      .catch((error) => {
        console.log(error);
        handleShow('Cannot create user');
      });
    // console.log('currentuser', currentUser)
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<SignIn onHandleShow={handleShow}/>} />
          <Route path='/signup' element={<SignUp
            addUserCallBack={addUser}
            onHandleShow={handleShow}/>} />
          <Route path='/dashboard/*' element={
            <ProtectedRoute>
              <Dashboard
                getPlayerNameFromId={getPlayerNameFromId}
                addPlayersCallBack={addPlayers}
                addMatchCallBack={addMatch}
                matches={matches}
                players={players}/>
            </ProtectedRoute>}/>
            <Route path='/matchstats' element={<ProtectedRoute><MatchStats /></ProtectedRoute>} />
            <Route path='/currentmatch' element={<ProtectedRoute><CurrentMatch /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
      <ErrorModal showModal={showModal} onHandleClose={handleClose} />
    </div>
  );
}

export default App;
