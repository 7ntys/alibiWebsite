const express=require('express');
const cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json());
const port = 4002;

//Firebase init =>//
const firebase = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDoc } = require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyBmvcgtjE3bgqDc7JxQZN0Rexynv7SFcQE",
  authDomain: "getout-648d9.firebaseapp.com",
  projectId: "getout-648d9",
  storageBucket: "getout-648d9.appspot.com",
  messagingSenderId: "747027428681",
  appId: "1:747027428681:web:c4db7cd272c2a17c1ad698",
  measurementId: "G-YQER5QETX1"
};

const fire_app = initializeApp(firebaseConfig);
const db = getFirestore(fire_app);
//End of Firebase init//

//Firebase logic =>//

async function startGame(enteredPseudonym,playerId) { //works

      try {

        console.log("Entered pseudonym:", enteredPseudonym);
        console.log("Player ID SVP : "+playerId);
        await initializePlayerId(enteredPseudonym,playerId);
  
        console.log("Initialized player ID:", playerId);
        
        const gameId = await createGameDocument();
  
        console.log('Game ID:', gameId);
        console.log('Player ID:', playerId);
  
        await addPlayerToGame(gameId, playerId);
  
        console.log("Everything is fine");
            } catch (error) { 
        console.error(error);
      }
}
    
async function createPlayerDocument(pseudo, team, playerId) {
      try {
        // Assuming 'db' is your Firestore database reference
        const collectionRef = firebase.collection(db, "active_player");
        const documentRef = firebase.doc(collectionRef, playerId);
    
        const playerData = {
          pseudo: pseudo,
          team: team
        };
    
        await firebase.setDoc(documentRef, playerData);
    
        console.log('Player document created successfully. Player ID:', playerId);
        return playerId;
      } catch (error) {
        console.error('Error creating player document:', error);
        // Handle the error appropriately, e.g., throw an error or return an error code
        throw error;
      }
}
    
async function createGameDocument() { //works
    try {
      const documentRef = firebase.collection(db, "games");
      const newDocRef = firebase.doc(documentRef);
      
      const gameData = {
        player_list: [],
        alibiTime: 60
      };
  
      await firebase.setDoc(newDocRef, gameData);
  
      const gameId = newDocRef.id;
      console.log('Game document created successfully. Document ID:', gameId);
      return gameId;
    } catch (error) {
      console.error('Error creating game document:', error);
    //   callback('Error creating game document: ' + error, null, null);
    }
}

// function generatePlayerId() {
//     createPlayerDocument(db, "None", 0, (error, playerId) => {
//       if (error) {
//         // Handle error
//         console.error(error);
//       } else {
//         // playerId = playerId;
//         // Player document created successfully
//         console.log('Player document created with ID:', playerId);
//       }
//     });
// }

async function getPlayerById(playerId) { //works
    try {
        console.log("Player id :"+playerId);
        const playersCollection = firebase.collection(db,'active_player');
        const playerRef = firebase.doc(playersCollection,playerId); 

        const doc = await firebase.getDoc(playerRef);

        if (doc.exists) {
            const playerData = doc.data();
            console.log('Player document fetched successfully:', playerData);
            return playerData;
        } else {
            console.log('Player document not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching player document:', error);
        throw error;
    }
}

async function addPlayerToGame(gameId, playerId) { //works
    try {
      const gamesCollection = firebase.collection(db, 'games');
      const gameRef = firebase.doc(gamesCollection, gameId);
  
      // Fetch the game document
      const docSnapshot = await firebase.getDoc(gameRef);
  
      if (docSnapshot.exists()) {
        const gameData = docSnapshot.data();
  
        // Check if player_list exists or initialize it
        if (!gameData.player_list) {
          gameData.player_list = [];
        }
  
        // Check if the player is not already in the list and the list is not full
        if (!gameData.player_list.includes(playerId) && gameData.player_list.length < 4) {
          gameData.player_list.push(playerId);
  
          // Update the game document with the modified player_list
          await firebase.updateDoc(gameRef, { player_list: gameData.player_list });
  
          console.log('Player added to the list successfully.');
        //   callback(null);
        } else {
          console.log('Player already in the list or list is full.');
        //   callback(null);
        }
      } else {
        console.log('Game document not found.');
        // callback(null);
      }
    } catch (error) {
      console.error('Error fetching or updating game document:', error);
    //   callback(error, null);
    }
}

async function initializePlayerId(enteredPseudonym,playerId) { //works
  
      try {
        await createPlayerDocument(enteredPseudonym, 0,playerId);
  
  
        // Player document created successfully
        console.log('Player document created with ID:', playerId);
  
        return playerId;
      } catch (error) {
        // Handle error
        console.error(error);
        throw error;
      }
}

async function getPlayerIDList(gameId) {
  console.log("Reached this point 3");
  try {
    console.log("Reached this point 2");
    const gamesCollection = firebase.collection(db, 'games');
    const gameRef = firebase.doc(gamesCollection, gameId);

    const doc = await firebase.getDoc(gameRef);
    console.log("Reached this point");

    if (doc.exists) {
      const gameData = doc.data();
      const playerIds = gameData.player_list || [];

      const playerInfoArray = [];

      for (const playerId of playerIds) {
        const playersCollection = firebase.collection(db, 'active_player');
        const playerRef = firebase.doc(playersCollection,playerId);
        const playerDoc = await firebase.getDoc(playerRef);

        if (playerDoc.exists) {
          const playerData = playerDoc.data();
          const playerInfo = {
            playerId: playerId,
            pseudo: playerData.pseudo || '',
            team: playerData.team || 0
          };
          playerInfoArray.push(playerInfo);
        }
        
      }
      console.log ("playerInfoArray : "+playerInfoArray[0].playerId);
      return playerInfoArray;

    
    } else {
      console.log('Game document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching game document:', error);
    return null;
  }
}

//End of Firebase logic//


//Express Post =>//

app.post('/startGame', async (req, res) => {
  try {
      const { enteredPseudonym, playerId } = req.body;
      const result = await startGame(enteredPseudonym, playerId);
      res.json({ playerId: result });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/createPlayer', async (req, res) => {
    try {
      const { pseudo, team } = req.body;
      await createPlayerDocument(pseudo, team,playerId);
      res.json({ playerId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.post('/createGameDocument', async (req, res) => {
    try {
        const gameId = await createGameDocument();
        res.json({ gameId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/generatePlayerId', async (req, res) => {
    try {
        const pseudo = 'None';
        const team = 0;
        const playerId = await createPlayerDocument(pseudo, team);
        res.json({ playerId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getPlayerById/:playerId', async (req, res) => {
    try {
        const playerId = req.params.playerId;
        console.log('Received request for playerId:', playerId);
        const playerData = await getPlayerById(playerId);

        if (playerData) {
            res.json({ playerData });
        } else {
            console.log('Player document not found for playerId:', playerId);
            res.status(404).json({ error: 'Player document not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addPlayerToGame/:gameId/:playerId', async (req, res) => {
    try {
        const { gameId, playerId } = req.params;
        const gameData = await addPlayerToGame(gameId, playerId);

        if (gameData) {
            res.json({ message: 'Player added to the game successfully' });
        } else {
            console.log('Game document not found.');
            res.status(404).json({ error: 'Game document not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getPlayerIDList/:gameId', async (req, res) => {
  try {
    console.log("Reached this point 1");
    const gameId = req.params.gameId;
    console.log('Received request for gameId:', gameId);
    const playerInfoArray = await getPlayerIDList(gameId);
    console.log("1jj" + playerInfoArray[0].playerId); //worked

    res.send(playerInfoArray);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Api call 



app.listen(port,()=>console.log("Alibi server is running on port "+port));


//End of Express Post//

//Function useful =>//
