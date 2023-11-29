const express=require('express');
const cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json());
const http = require('http').Server(app);
require('dotenv').config({ path: 'config.env' });


const io = require('socket.io')(http, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST","PUT"]
  }, 
  serveClient:false,
  debug:true
});

const port = process.env.PORT;



//Firebase init =>//
const firebase = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDoc, onSnapshot,getDocs } = require('firebase/firestore');
// const { getAlibibyTeam } = require('@/crude');


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
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
                picture_index: playerData.picture_index || 0,
                team: teamList[cpt]
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

  socket.on('playersAnswers', (gameId) => {
    console.log('Client connected playersAnswers');

    // Listen for changes to player_list and emit them to the client
    const collectionRef = collection(db,'games');
    const docRef = doc(collectionRef,gameId);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      try {
        if (doc.exists) {
          let answer = doc.data().answer;
          
          console.log ("Answer in the socket : "+answer);
          answer = JSON.stringify(answer);
          answer = JSON.parse(answer);
          console.log("Answer in the socket 2 : "+answer);
          socket.emit('playersAnswers', { answer: answer });
        }
      } catch (error) {
        console.error('Error updating player answer:', error);
        throw error;
      }
    });
    
  
    // Clean up when the client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      unsubscribe();
    });
  });


  socket.on('ComparaisonListeners', (gameId) => {
    console.log('Client connected GameSettings');

    // Listen for changes to player_list and emit them to the client
    const collectionRef = collection(db,'games');
    const docRef = doc(collectionRef,gameId);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      try {
        if (doc.exists) {
          let array = [];
          array.push(doc.data().team1_answer); 
          array.push(doc.data().team2_answer); 

          
          console.log ("ComparaisonListeners in the socket : "+array);
          socket.emit('ComparaisonListeners', { array: array });
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

  
  socket.on('SubmitandDoneListeners', (gameId) => {
    console.log('Client connected Submit&DoneListeners');

    // Listen for changes to player_list and emit them to the client
    const collectionRef = collection(db,'games');
    const docRef = doc(collectionRef,gameId);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      try {
        if (doc.exists) {

          let check = doc.data().check;   
          console.log ("Submit & Done Listeners in the socket : "+check);
          socket.emit('SubmitandDoneListeners', { check: check });
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

  
  




async function startGame(enteredPseudonym,playerId,gameId,picture_index) { //works

      try {
        await initializePlayerId(enteredPseudonym,playerId,picture_index);  
        await createGameDocument(gameId);  
        await addPlayerToGame(gameId, playerId);
              } catch (error) { 
        console.error(error);
      }
}
    
async function createPlayerDocument(pseudo, picture_index, playerId) {
      try {
        // Assuming 'db' is your Firestore database reference
        const collectionRef = firebase.collection(db, "active_player");
        const documentRef = firebase.doc(collectionRef, playerId);
    
        const playerData = {
          pseudo: pseudo,
          picture_index: picture_index
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
      const documentRef = firebase.collection(db, "games");
      const newDocRef = firebase.doc(documentRef, gameId);
      const gameData = {
        player_list: [],
        team:[0,0,0,0],
        gameSettings:{"alibiTime":10,"tsunami":false,"fire":false,"vanish":false,"ink":false,"started":false},

        answer:[{"0":"","1":"","2":"","3":"","4":""},{"0":"","1":"","2":"","3":"","4":""},{"0":"","1":"","2":"","3":"","4":""},{"0":"","1":"","2":"","3":"","4":""}],
        team1_answer:[2,2,2,2,2],
        team2_answer:[2,2,2,2,2],
        check:{"submit":false,"done":false},    
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
      nextId++; 
    }

    console.log('Alibi documents created successfully');
  } catch (error) {
    console.error('Error creating alibi documents:', error);
  }
}

async function getPlayerById(playerId) { //works
    try {
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
      throw(error);
  }
}

async function updatePlayerAnswers(gameId, playerId, player_answer) {
  try {
      console.log("player_answer : "+player_answer);
      console.log("playerId : "+playerId);
      console.log("gameId : "+gameId);
      const gamesCollection = collection(db, 'games');
      const gameRef = doc(gamesCollection, gameId);

      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
          console.log('Game document not found.');
          return null;
      }

      const playerIds = gameDoc.data().player_list;
      const answerList = gameDoc.data().answer;
      console.log("PASSE");
      console.log("playerIds : "+playerIds);
      const playerIndex = playerIds.indexOf(playerId);
      console.log("playerIndex : "+playerIndex);
      if (playerIndex !== -1) {
          // Update the teamId at the corresponding index in the teamList array
          answerList[playerIndex] = player_answer;
          console.log("answerList : "+answerList);

          // Update the game document with the modified teamList
          await updateDoc(gameRef, { answer: answerList }).then(() => {;

          console.log('Update Players answers successfully.');
          });
      } else {
          console.log('Player not found in the playerIds array.');
          return null;
      }
  } catch (error) {
      console.error('Error updating player answer:', error);
      throw(error);
  }
}

async function updateGameSettings(gameId,array) { //works
  try {
    const gamesCollection = firebase.collection(db,'games');
    const gameRef = firebase.doc(gamesCollection, gameId);
    const docSnapshot = await firebase.getDoc(gameRef);
    console.log("array :",array);
    

    if (docSnapshot.exists()) {
      const gameData = docSnapshot.data().gameSettings;
      console.log("gameData :",gameData);

      if(array[0] != null){gameData.alibiTime = array[0];}
      if(array[1] != null){gameData.fire = array[1];console.log("Updating fire to ",array[1])}
      if(array[2] != null){gameData.ink = array[2];console.log("Updating ink to ",array[2])}
      if(array[3] != null){gameData.vanish = array[3];console.log("Updating vanish to ",array[3])}
      if(array[4] != null){gameData.tsunami = array[4];console.log("Updating tsunami to ",array[4])}
      if(array[5] != null){gameData.started = array[5];console.log("Updating started to ",array[5])}




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
      const gameRef = firebase.doc(gamesCollection, gameId);
  
      // Fetch the game document
      const docSnapshot = await firebase.getDoc(gameRef);
      console.log("Result : ",docSnapshot.exists());
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

async function initializePlayerId(enteredPseudonym,playerId, picture_index) { //works
  
      try {
        await createPlayerDocument(enteredPseudonym, picture_index,playerId);
  
  
        // Player document created successfully
        console.log('Player document created with ID:', playerId);
  
        return playerId;
      } catch (error) {
        // Handle error
        console.error(error);
        throw error;
      }
}

async function updateComparaisonList(gameId,teamId,array) { //works
  try {
    const gamesCollection = firebase.collection(db,'games');
    const gameRef = firebase.doc(gamesCollection, gameId);
    const docSnapshot = await firebase.getDoc(gameRef);
    console.log("array :",array);
    

    if (docSnapshot.exists()) {

      let gameData;
      if(teamId == 1){gameData = docSnapshot.data().team1_answer;}
      else if(teamId == 2){gameData = docSnapshot.data().team2_answer;}

      for (let i = 0; i < array.length; i++) {
        if(array[i] != null){
        gameData[i] = array[i];
        }
      }

      if     (teamId == 1){ await updateDoc(gameRef, { team1_answer: gameData });}
      else if(teamId == 2){ await updateDoc(gameRef, { team2_answer: gameData });}




      console.log('Comparaison List updated successfully.');

      
    }
  } catch (error) {
    console.error('Error fetching or updating game document:', error);
  //   callback(error, null);
  }
}

async function updateSubmitandDone(gameId,array) { //works
  try {
    const gamesCollection = firebase.collection(db,'games');
    const gameRef = firebase.doc(gamesCollection, gameId);
    const docSnapshot = await firebase.getDoc(gameRef);
    console.log("array :",array);
    

    if (docSnapshot.exists()) {

      let gameData = docSnapshot.data().check;
      if(array[0] != null){gameData.submit = true;}
      if(array[1] != null){gameData.done = true;}

      await updateDoc(gameRef, { check: gameData });

    }
  } catch (error) {
    console.error('Error fetching or updating game document:', error);
  //   callback(error, null);
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
            picture_index: playerData.picture_index || 0
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

async function getTeamList(gameId) {
  try {
      const gamesCollection = collection(db, 'games');
      const gameRef = doc(gamesCollection, gameId);

      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
          console.log('Game document not found.');
          return null;
      }

      let teamList = gameDoc.data().team;
      console.log("teamList dd : "+teamList);

      return teamList;
  } catch (error) {
      console.error('Error updating player team:', error);
      throw(error);
  }
}

async function getQuestionsbyTeam(gameId,teamId) {
  try {
      const gamesCollection = collection(db, 'games');
      const gameRef = doc(gamesCollection, gameId);

      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
          console.log('Game document not found.');
          return null;
      }
      let questionsList;
      if(teamId == 1){questionsList = gameDoc.data().team1_alibi.questions;}
      if(teamId == 2){questionsList = gameDoc.data().team2_alibi.questions;}

      return questionsList;
  } catch (error) {
      console.error('Error updating player team:', error);
      throw(error);
  }
}

async function getAlibibyTeam(gameId, teamId) {
  try {
    console.log("ça passe express");
    console.log(" express gameId : " + gameId + " teamId : " + teamId);
    const gamesCollection = firebase.collection(db, 'games');
    const gameRef = firebase.doc(gamesCollection, gameId);

    const doc = await firebase.getDoc(gameRef);
    console.log("Reached this point");

    if (doc.exists) {

      let alibi_info = null;
      console.log("alibi :",doc.data().team2_alibi);
      if (teamId == 1) {
        console.log("ça passe mdrr");
        alibi_info = doc.data().team1_alibi;
        console.log("ça passe mdrr 2");
      }
      else if (teamId == 2) {
        console.log("ça passe mdrr 3");
        alibi_info = doc.data().team2_alibi;
        console.log("ça passe mdrr 4");
      }

      console.log("AlibiIds : " + alibi_info);

      return alibi_info;
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

      const randomQuestions = data.questions.sort(() => Math.random() - 0.5).slice(0, 6);
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
      const { enteredPseudonym, playerId, gameId, picture_index } = req.body;
      const result = await startGame(enteredPseudonym, playerId,gameId,picture_index);
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

app.get('/getAlibibyTeam/:gameId/:teamId', async (req, res) => {
  try {
    const { gameId, teamId } = req.params;
    console.log('Received request for getAlibibyTeam for team ', teamId);
    const alibi_info = await getAlibibyTeam(gameId, teamId);

    if (alibi_info) {
      res.json({ alibi_info });
    } else {
      console.log('Alibi document not found for teamId:', teamId);
      res.status(404).json({ error: 'Alibi document not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getQuestionsbyTeam/:gameId/:teamId', async (req, res) => {
  try {
    const { gameId, teamId } = req.params;
    console.log('Received request for getQuestionsByTeam for team ', teamId);
    const questionsList = await getQuestionsbyTeam(gameId, teamId);

    if (questionsList) {
      res.json({ questionsList });
    } else {
      console.log('Questions document not found for teamId:', teamId);
      res.status(404).json({ error: 'Questions document not found' });
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

app.get('/getTeamList/:gameId', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    console.log('Received request for gameId:', gameId);
    const teamList = await getTeamList(gameId);

    res.send(teamList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updatePlayerTeam/:gameId/:playerId', async (req, res) => {
  try {
    const { gameId, playerId } = req.params;
    const { teamId } = req.body;

    await updatePlayerTeam(gameId, playerId, teamId);

    // Move res.end() inside the try block to ensure it's called after the asynchronous operation
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating player team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updateSubmitandDone/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { array } = req.body;

    await updateSubmitandDone(gameId, array);


    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating player team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/updateComparaisonList/:gameId/:teamId', async (req, res) => {
  try {
    const { gameId, teamId } = req.params;
    const { array } = req.body;

    await updateComparaisonList(gameId, teamId, array);

    // Move res.end() inside the try block to ensure it's called after the asynchronous operation
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating comparaison list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/updatePlayerAnswers/:gameId/:playerId', async (req, res) => {
  try {
    const { gameId, playerId } = req.params;
    const { answer } = req.body;

    await updatePlayerAnswers(gameId, playerId, answer);

    // Send a success response
    res.json({ success: true });
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
