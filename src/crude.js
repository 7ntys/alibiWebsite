import axios from 'axios';




export async function createPlayer(pseudo,team,playerId) {
    try {
      const response = await axios.post('http://localhost:4001/createPlayer', {
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

export async function createGameDocument() {
    try {
      const response = await axios.post('http://localhost:4001/createGameDocument');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
}  

export async function getPlayerById(playerId) {
    try {
        const response = await axios.get(`http://localhost:4001/getPlayerById/${playerId}`);
        console.log(response.data);  
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;    
    }
}

export async function addPlayerToGame(gameId, playerId) {
    try {
        const response = await axios.post(`http://localhost:4001/addPlayerToGame/${gameId}/${playerId}`);
        console.log(response.data);  
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function startGame(enteredPseudonym, playerId) {
    try {
        const response = await axios.post('http://localhost:4001/startGame', { enteredPseudonym, playerId });
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


