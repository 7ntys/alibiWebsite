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