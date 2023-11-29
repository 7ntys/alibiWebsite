import axios from 'axios';
// import io from 'socket.io-client';

//Note : desfois l'ordre de placement des fonctions des crudes changent le fonctionnement du programme 


export async function getPlayerIDList(gameId) {
  try {
      const response = await axios.get(`http://localhost:4002/getPlayerIDList/${gameId}`);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching player ID list:', error);
      throw error;
  }
}

export async function getTeamList(gameId) {
  try {
      const response = await axios.get(`http://localhost:4002/getTeamList/${gameId}`);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching team list:', error);
      throw error;
  }
}

export async function createPlayer(pseudo,team,playerId) {
    try {
      const response = await axios.post('http://localhost:4002/createPlayer', {
        pseudo: pseudo,
        team: team,
        playerId : playerId
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function createGameDocument(gameId) {
    try {
      const response = await axios.post('http://localhost:4002/createGameDocument', {gameId:gameId});
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
}  

export async function getPlayerById(playerId) {
    try {
        const response = await axios.get(`http://localhost:4002/getPlayerById/${playerId}`);
        console.log("2443");
        console.log("response data"+response.data);  
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;    
    }
}

export async function getAlibibyTeam(gameId, teamId) {
  try {
    console.log("crude axios gameId : " + gameId + " teamId : " + teamId);
    const response = await axios.get(`http://localhost:4002/getAlibibyTeam/${gameId}/${teamId}`);
    response.data = JSON.stringify(response.data);
    return JSON.parse(response.data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function addPlayerToGame(gameId, playerId) {
  try {
    const response = await axios.post(`http://localhost:4002/addPlayerToGame/${gameId}/${playerId}`);
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding player to the game:', error);
    throw error;
  }
}

export async function startGame(enteredPseudonym, playerId, gameId) {
    try {
        const response = await axios.post('http://localhost:4002/startGame', { enteredPseudonym, playerId, gameId });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function updatePlayerTeam(gameId, playerId, teamId) {
  let retries = 0;
  const MAX_RETRIES = 3;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.put(`http://localhost:4002/updatePlayerTeam/${gameId}/${playerId}`, { teamId }, {
        timeout: 10000,
      });

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error updating player team:', error);

      if (axios.isCancel(error) || error.code === 'ECONNABORTED') {
        // If the request was canceled or timed out, retry the request
        console.log(`Retrying request (Attempt ${retries + 1})`);
        retries++;
      } else {
        // If it's another type of error, stop retrying and throw the error
        throw error;
      }
    }
  }

  // If we reach here, it means the maximum number of retries has been reached
  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

export async function updatePlayerAnswers(gameId, playerId, answer) {
  let retries = 0;
  const MAX_RETRIES = 3;

  while (retries < MAX_RETRIES) {
    try {
      console.log("crude axios gameId : " + gameId + " playerId : " + playerId + " answer : " + answer);
      const response = await axios.put(`http://localhost:4002/updatePlayerAnswers/${gameId}/${playerId}`, { answer }, {
        timeout: 10000,
      });
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error updating player answers:', error);

      if (axios.isCancel(error) || error.code === 'ECONNABORTED') {
        
        console.log(`Retrying request (Attempt ${retries + 1})`);
        retries++;
      } else {
        
        throw error;
      }
    }
  }

  // If we reach here, it means the maximum number of retries has been reached
  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}


export async function updateGameSettings(gameId, array) {
  try {
    const response = await axios.post(`http://localhost:4002/updateGameSettings/${gameId}`, { array });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating game settings:', error);
    throw error;
  }
}

export async function createAlibiDocuments(alibis, nextId) {
  try {
    const response = await axios.post('http://localhost:3000/createAlibiDocuments', { alibis, nextId });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating alibi documents:', error);
    throw error;
  }
}



//Useful functions
export function getFromSessionStorage(key) {
  return sessionStorage.getItem(key);
}

export function setFromSessionStorage(key,value) {
  sessionStorage.setItem(key, value);
}  

export function generateId() {

  const timestamp = Date.now();

  const randomNum = Math.floor(Math.random() * 10000);

  const uniqueId = `${timestamp}${randomNum}`;
  uniqueId.toString();
  console.log("unique  id : "+uniqueId);
  return uniqueId;
}

export function generate_soft_ID() {
  // Définir les caractères possibles
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Longueur de l'ID que vous souhaitez générer
  const longueurID = 6;

  let id = '';

  // Générer l'ID en bouclant sur la longueur spécifiée
  for (let i = 0; i < longueurID; i++) {
    // Sélectionner un caractère aléatoire
    const caractereAleatoire = caracteres.charAt(Math.floor(Math.random() * caracteres.length));

    // Ajouter le caractère à l'ID
    id += caractereAleatoire;
  }

  return id;
}




