// const firebase = require('firebase/firestore');
// const { initializeApp } = require('firebase/app');
// const { getFirestore, collection, doc, setDoc, updateDoc, getDoc } = require('firebase/firestore');


// const firebaseConfig = {
//   apiKey: "AIzaSyBmvcgtjE3bgqDc7JxQZN0Rexynv7SFcQE",
//   authDomain: "getout-648d9.firebaseapp.com",
//   projectId: "getout-648d9",
//   storageBucket: "getout-648d9.appspot.com",
//   messagingSenderId: "747027428681",
//   appId: "1:747027428681:web:c4db7cd272c2a17c1ad698",
//   measurementId: "G-YQER5QETX1"
// };
// module.exports= db;
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const Alibi = firebase.collection(db,"alibi");



// Required for side-effects
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// BACKEND 
//import firebase from "firebase/compat/app";
// Required for side-effects
//import "firebase/firestore";

  
// function setPlayerTeam(db, playerId, team, callback) {
//   const playerRef = firebase.collection('active_player').doc(playerId);

//   playerRef.update({
//     team: team
//   })
//   .then(() => {
//     callback(null);
//   })
//   .catch(error => {
//     console.error('Error updating player document:', error);
//     callback('Error updating player document: ' + error);
//   });
// }

// function setPlayerName(db, playerId, name, callback) {
//   const playerRef = firebase.collection('active_player').doc(playerId);

//   playerRef.update({
//     pseudo: name
//   })
//   .then(() => {
//     callback(null);
//   })
//   .catch(error => {
//     console.error('Error updating player document:', error);
//     callback('Error updating player document: ' + error);
//   });
// }

// function isPlayerInList(db, gameId, playerId, callback) {
//   getPlayerIDList(db, gameId, function(err, playerIds) {
//     if (err) {
//       callback(err, null);
//     } else {
//       const isInList = playerIds.includes(playerId);
//       callback(null, isInList);
//     }
//   });
// }

