import axios from 'axios';




export async function createPlayer() {
    try {
      const response = await axios.post('http://localhost:4001/createPlayer', {
        pseudo: 'John Doe',
        team: 'Blue',
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


//not tested function from here :

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

export function setPlayerIdSessionStorage(playerId) {
  sessionStorage.setItem('player_id', playerId);
}  