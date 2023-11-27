const express=require('express');
const cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json());
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST","PUT"]
  }, 
  serveClient:false,
  debug:true
});

const port = 4002;



//Firebase init =>//
const firebase = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDoc, onSnapshot,getDocs } = require('firebase/firestore');


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


io.on('connection', (socket) => {
  

  socket.on('playerListUpdate', (gameId) => {
    console.log('Client connected playerListUpdate');
    console.log("gameId :",gameId);
    // Listen for changes to player_list and emit them to the client
    const collectionRef = collection(db,'games');
    const docRef = doc(collectionRef,gameId);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      try {
        if (doc.exists) {
          const playerIds = doc.data().player_list;
          const teamList = doc.data().team;
          const playerInfoArray = [];
          console.log("Firebase list has been updated");
          console.log("Updated player list inside the socket : "+playerIds);
          console.log("Updated team list inside the socket : "+teamList);
          let cpt = 0;
          for (const playerId of playerIds) {
            const playersCollection = firebase.collection(db, 'active_player');
            const playerRef = firebase.doc(playersCollection,playerId);
            const playerDoc = await firebase.getDoc(playerRef);
    
            if (playerDoc.exists) {
              const playerData = playerDoc.data();
              const playerInfo = {
                playerId: playerId,
                pseudo: playerData.pseudo || '',
                team: teamList[cpt] || 0
              };
              playerInfoArray.push(playerInfo);
            }
          cpt++;  
            
          }
          console.log ("playerInfoArray in the socket : "+playerInfoArray);
          socket.emit('playerListUpdate', { playerList: playerInfoArray });
        }
      } catch (error) {
        console.error('Error updating player list:', error);
        throw error;
      }
    });
  
    // Clean up when the client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      unsubscribe();
    });
  });

  socket.on('GameSettings', (gameId) => {
    console.log('Client connected GameSettings');

    // Listen for changes to player_list and emit them to the client
    const collectionRef = collection(db,'games');
    const docRef = doc(collectionRef,gameId);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      try {
        if (doc.exists) {
          const gameSettings = doc.data().gameSettings;
          
          console.log ("GameSettings in the socket : "+gameSettings);
          socket.emit('GameSettings', { gameSettings: gameSettings });
        }
      } catch (error) {
        console.error('Error updating player list:', error);
        throw error;
      }
    });
  
    // Clean up when the client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      unsubscribe();
    });
  });
   

});

  
  




async function startGame(enteredPseudonym,playerId,gameId) { //works

      try {

        console.log("Entered pseudonym:", enteredPseudonym);
        await initializePlayerId(enteredPseudonym,playerId);
  
        console.log("Initialized player ID:", playerId);
        console.log("Game ID SVP : "+gameId);
        await createGameDocument(gameId);
  
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
    
async function createGameDocument(gameId) { //works
    try {
      console.log("Game IDDDDD :"+gameId);
      const documentRef = firebase.collection(db, "games");
      const newDocRef = firebase.doc(documentRef, gameId);
      const gameData = {
        player_list: [],
        team:[0,0,0,0],
        started: false,
        gameSettings:{"alibiTime":60,"tsunami":"off","fire":"off","lamp":"off","hidden_chrono":"off"},
        team1_alibi:await getRandomAlibi(),
        team2_alibi:await getRandomAlibi() 
        
        
        };
  
      await firebase.setDoc(newDocRef, gameData);
  
      console.log('Game document created successfully. Document ID:', gameId);
      return gameId;
    } catch (error) {
      console.error('Error creating game document:', error);
    //   callback('Error creating game document: ' + error, null, null);
    }
}

async function createAlibiDocuments(alibis,nextId) {
  try {
    const collectionRef = firebase.collection(db, "alibi");

    // Obtenez le plus grand ID existant dans la collection
    // const snapshot = await firebase.getDocs(collectionRef.orderBy("id", "desc").limit(1));
   // Si la collection est vide, commencez par 1

    // if (!snapshot.empty) {
    //   const lastDocument = snapshot.docs[0].data();
    //   nextId = lastDocument.id + 1;
    // }

    // Ajoutez les nouveaux alibis avec les nouveaux ID
    for (const alibi of alibis) {
      const newDocRef = firebase.doc(collectionRef, nextId.toString());
      await firebase.setDoc(newDocRef, alibi);
      nextId++; // Incrémente l'ID pour le prochain alibi
    }

    console.log('Alibi documents created successfully');
  } catch (error) {
    console.error('Error creating alibi documents:', error);
  }
}







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

async function updatePlayerTeam(gameId, playerId, teamId) {
  try {
      const gamesCollection = collection(db, 'games');
      const gameRef = doc(gamesCollection, gameId);

      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
          console.log('Game document not found.');
          return null;
      }

      const playerIds = gameDoc.data().player_list;
      let teamList = gameDoc.data().team;
      console.log("teamList : "+teamList);
      console.log("playerIds : "+playerIds);
      console.log("teamId : "+teamId);
      // Find the index of the playerId in the playerIds array
      const playerIndex = playerIds.indexOf(playerId);

      if (playerIndex !== -1) {
          // Update the teamId at the corresponding index in the teamList array
          teamList[playerIndex] = teamId;

          // Update the game document with the modified teamList
          await updateDoc(gameRef, { team: teamList });

          console.log('Team updated successfully.');
      } else {
          console.log('Player not found in the playerIds array.');
          return null;
      }
  } catch (error) {
      console.error('Error updating player team:', error);
      return null;
  }
}

async function updateGameSettings(gameId,array) { //works
  try {
    const gamesCollection = firebase.collection(db,'games');
    const gameRef = firebase.doc(gamesCollection, gameId);
    const docSnapshot = await firebase.getDoc(gameRef);

    

    if (docSnapshot.exists()) {
      const gameData = docSnapshot.data().gameSettings;

      if(array[0] != null){gameData.alibiTime = array[0];}
      if(array[1] != null){gameData.fire = array[1];}
      if(array[2] != null){gameData.hidden_chrono = array[2];}
      if(array[3] != null){gameData.lamp = array[3];}
      if(array[4] != null){gameData.tsunami = array[4];}


      await updateDoc(gameRef, { gameSettings: gameData });

      console.log('GameSettings updated successfully.');

      
    }
  } catch (error) {
    console.error('Error fetching or updating game document:', error);
  //   callback(error, null);
  }
}

async function addPlayerToGame(gameId, playerId) { //works
    try {
      const gamesCollection = firebase.collection(db,'games');
      console.log("Intra-Game ID : "+gameId);
      const gameRef = firebase.doc(gamesCollection, gameId);
  
      // Fetch the game document
      const docSnapshot = await firebase.getDoc(gameRef);
      console.log("Result : ",docSnapshot.exists());
      if (docSnapshot.exists()) {
        console.log("CA PASSE PUTAIN ");
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
          // return { success: true, message: 'Player added to the game successfully.' };
          console.log("Player added to the game successfully.");
        //   callback(null);
        } else {
          console.log('Player already in the list or list is full.');
        //   callback(null);
        }
        
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

  try {
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
      console.log ("playerInfoArray : "+playerInfoArray);

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

async function getRandomAlibi() {
  try {
    const collectionRef = collection(db, "alibi");
    const snapshot = await getDocs(collectionRef);
    const totalDocuments = snapshot.size;

    const randomIndex = Math.floor(Math.random() * totalDocuments);
    console.log("random index : "+randomIndex);

    const randomDocument = snapshot.docs[randomIndex];

    if (randomDocument) {
      const data = randomDocument.data();
      const alibi = { "text": data.text, "questions": [] };

      const randomQuestions = data.questions.sort(() => Math.random() - 0.5).slice(0, 8);
      alibi.questions = randomQuestions;

      return alibi;
    } else {
      console.log("Aucun document trouvé.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'alibi :", error);
    throw error;
  }
}


//End of Firebase logic//


//Express Post =>//

app.post('/startGame', async (req, res) => {
  try {
      const { enteredPseudonym, playerId, gameId } = req.body;
      const result = await startGame(enteredPseudonym, playerId,gameId);
      res.json({ playerId: result });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/createPlayer', async (req, res) => {
    try {
      const { pseudo, team, playerId } = req.body;
      await createPlayerDocument(pseudo,team,playerId);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.post('/createGameDocument', async (req, res) => {
    try {
        const { gameId } = req.body;
        await createGameDocument(gameId);
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
        console.log("ça passe");
        await addPlayerToGame(gameId, playerId);
        console.log("ça passe 2");
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

app.put('/updatePlayerTeam/:gameId/:playerId', async (req, res) => {
  try {
    const { gameId,playerId } = req.params;
    const { teamId } = req.body;

    await updatePlayerTeam(gameId,playerId,teamId);
    } catch (error) {
    console.error('Error updating player team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/updateGameSettings/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { array } = req.body;

    await updateGameSettings(gameId, array);
    
    res.status(200).json({ message: 'Game settings updated successfully' });
  } catch (error) {
    console.error('Error updating game settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/createAlibiDocuments', async (req, res) => {
  try {
    const { alibis, nextId } = req.body;

    if (!alibis || !Array.isArray(alibis) || alibis.length === 0 || typeof nextId !== 'number') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    await createAlibiDocuments(alibis, nextId);
    
    res.status(200).json({ message: 'Alibi documents created successfully' });
  } catch (error) {
    console.error('Error creating alibi documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Api call 



http.listen(port,()=>console.log("Alibi server is running on port "+port));


//End of Express Post//

//Function useful =>//

// ...

// Firestore listeners



// ...

// Usage example

// To stop listening, call the unsubscribe function
// unsubscribe();
