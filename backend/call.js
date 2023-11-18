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

  
// async function start_game() {
//   // Retrieve pseudonym information
//   const pseudonymInput = document.getElementById("pseudonym");
//   const enteredPseudonym = pseudonymInput.value;

//   if (enteredPseudonym.trim() === "") {
//     alert("Please enter a pseudonym.");
//   } else {
//     try {
//       // Perform further processing with the entered pseudonym
//       console.log("Entered pseudonym:", enteredPseudonym);
      
//       const playerId = await initializePlayerId(enteredPseudonym);

//       console.log("Initialized player ID:", playerId);
//       console.log("Result:", getPlayerIdFromSessionStorage());

//       const gameId = await createGameDocument(db);

//       console.log('Game ID:', gameId);
//       console.log('Player ID:', playerId);

//       await addPlayerToGame(db, gameId, playerId);

//       console.log("Everything is fine");
//       // window.location.href = "lobby.html" + '?i=' + gameId;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
  



// function setPlayerIdSessionStorage(playerId) {
//   sessionStorage.setItem('player_id', playerId);
// }

// function getPlayerIdFromSessionStorage() {
//   return sessionStorage.getItem('player_id');
// }

// async function initializePlayerId(enteredPseudonym) {
//   let playerId = getPlayerIdFromSessionStorage();

//   if (!playerId) {
//     try {
//       // Player ID doesn't exist
//       const newPlayerId = await createPlayerDocument(db, enteredPseudonym, 0);

//       playerId = newPlayerId;

//       // Player document created successfully
//       console.log('Player document created with ID:', playerId);
//       setPlayerIdSessionStorage(playerId);

//       console.log("Player ID doesn't exist; here is the new ID:", playerId);

//       return playerId;
//     } catch (error) {
//       // Handle error
//       console.error(error);
//       throw error;
//     }
//   } else {
//     console.log("Player ID exists; here is the ID:", playerId);
//     return playerId;
//   }
// }

// async function addPlayerToGame(db, gameId, playerId, callback) {
//   try {
//     const gamesCollection = firebase.collection(db, 'games');
//     const gameRef = firebase.doc(gamesCollection, gameId);

//     // Fetch the game document
//     const docSnapshot = await firebase.getDoc(gameRef);

//     if (docSnapshot.exists()) {
//       const gameData = docSnapshot.data();

//       // Check if player_list exists or initialize it
//       if (!gameData.player_list) {
//         gameData.player_list = [];
//       }

//       // Check if the player is not already in the list and the list is not full
//       if (!gameData.player_list.includes(playerId) && gameData.player_list.length < 4) {
//         gameData.player_list.push(playerId);

//         // Update the game document with the modified player_list
//         await firebase.updateDoc(gameRef, { player_list: gameData.player_list });

//         console.log('Player added to the list successfully.');
//         callback(null);
//       } else {
//         console.log('Player already in the list or list is full.');
//         callback(null);
//       }
//     } else {
//       console.log('Game document not found.');
//       callback(null);
//     }
//   } catch (error) {
//     console.error('Error fetching or updating game document:', error);
//     callback(error, null);
//   }
// }



// function getPlayerIDList(db, gameId, callback) {
//   const gamesCollection = firebase.collection('games');
//   const gameRef = gamesCollection.doc(gameId);

//   // Fetch the game document
//   gameRef.get()
//     .then((doc) => {
//       if (doc.exists) {
//         const gameData = doc.data();
//         const playerIds = gameData.player_list || [];

//         const playerInfoArray = [];
//         let fetchedPlayers = 0;

//         playerIds.forEach(playerId => {
//           const playerRef = firebase.collection('active_player').doc(playerId);
//           playerRef.get().then(playerDoc => {
//             if (playerDoc.exists) {
//               const playerData = playerDoc.data();
//               const playerInfo = {
//                 playerId: playerId,
//                 pseudo: playerData.pseudo || '',
//                 team: playerData.team || 0
//               };
//               playerInfoArray.push(playerInfo);
//             }

//             fetchedPlayers++;
//             if (fetchedPlayers === playerIds.length) {
//               callback(null, playerInfoArray);
//             }
//           });
//         });
//       } else {
//         callback('Game document not found.', null);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching game document:', error);
//       callback('Error fetching game document: ' + error, null);
//     });
// }

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

