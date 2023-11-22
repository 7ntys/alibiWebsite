import axios from 'axios';
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

export async function addPlayerToGame(gameId, playerId) {
    try {
        const response = await axios.post(`http://localhost:4002/addPlayerToGame/${gameId}/${playerId}`);
        console.log(response.data);  
        return response.data;
    } catch (error) {
        console.error('Error:', error);
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

//Useful functions
export function getPlayerIdFromSessionStorage() {
  return sessionStorage.getItem('player_id');
}

export function setPlayerIdFromSessionStorage(playerId) {
  sessionStorage.setItem('player_id', playerId);
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


