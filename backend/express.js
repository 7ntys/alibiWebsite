const express=require('express');
const cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json());
const port = 4001;

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
async function createPlayerDocument(pseudo, team) {
    try {
      const documentRef = firebase.collection(db, "active_player");
      const newDocRef = firebase.doc(documentRef);
      
        const playerData = {
          pseudo: pseudo,
          team: team
        };
      
      await firebase.setDoc(newDocRef, playerData);
      
      const playerId = newDocRef.id;
      console.log('Player document created successfully. Player ID:', playerId);
    //   callback(null, playerId);
    } catch (error) {
      console.error('Error creating player document:', error);
    //   callback('Error creating player document: ' + error, null, null);
    }
  }
//createGamedocument a une logique new spécial avec try et catch alors que les autres sont des fonctions normales (a voir si ça bug)
async function createGameDocument() {
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
    //   callback(null, gameId);
    } catch (error) {
      console.error('Error creating game document:', error);
    //   callback('Error creating game document: ' + error, null, null);
    }
  }

function generatePlayerId() {
    createPlayerDocument(db, "None", 0, (error, playerId) => {
      if (error) {
        // Handle error
        console.error(error);
      } else {
        // playerId = playerId;
        // Player document created successfully
        console.log('Player document created with ID:', playerId);
      }
    });
  }

function getPlayerById(db, playerId, callback) {
    const playersCollection = firebase.collection('active_players');
    const playerRef = playersCollection.doc(playerId);
  
    playerRef.get()
      .then((doc) => {
        if (doc.exists) {
          const playerData = doc.data();
          callback(null, playerData);
        } else {
          console.log('Player document not found.');
          callback(null, null);
        }
      })
      .catch(error => {
        console.error('Error fetching player document:', error);
        callback(error, null);
      });
  }  




//End of Firebase logic//

//Express Post =>//
app.post('/createPlayer', async (req, res) => {
    try {
      const { pseudo, team } = req.body;
      const playerId = await createPlayerDocument(pseudo, team);
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
        const { playerId } = req.params;
        const playerData = await getPlayerById(playerId);
        
        if (playerData) {
            res.json({ playerData });
        } else {
            console.log('Player document not found.');
            res.status(404).json({ error: 'Player document not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







app.listen(port,()=>console.log("server is running on port "+port));