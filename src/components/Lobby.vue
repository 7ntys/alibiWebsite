<template>
  <div class="container">
    <div class="gameOptions">
      <GameOptions :game-code="gameCode" :players="players"></GameOptions>
    </div>
    <div class="playerProfile">
      <PlayerProfile v-for="player in players" :key="player.name" :playerGiven="player"></PlayerProfile>
    </div>
  </div>
</template>

<script>
import GameOptions from "@/components/GameOptions";

class Player {
  constructor(name, team,pictureIndex,id) {
    this.name = name;
    this.pictureIndex = pictureIndex;
    this.team = team;
    this.id = id;
  }
}

import PlayerProfile from "./PlayerProfile.vue"
import {getFromSessionStorage, setFromSessionStorage} from "../crude.js";
import io from 'socket.io-client';
export default {
  name: "LobbyComponent",
  props:["gameCode"],
  components: {
    GameOptions,
    PlayerProfile
  },
  mounted() {
  console.log("Mounted come");

  //Listeners 1 for playerList 

  const socket = io('http://localhost:4002', { transports: ['websocket'], debug: true });
  socket.connect();
  
  // Emit the 'playerListUpdate' event to the server
  console.log("GameCode : ",this.gameCode);
  socket.emit('playerListUpdate', (this.gameCode));
  console.log("GameCode 2: ",this.gameCode);
  console.log("Emitting playerListUpdate event to the server");
  
  socket.on('playerListUpdate', ({ playerList }) => {
    console.log("Nouvelle valeur de player_list en temps réel", playerList);
    
    // Map the playerList to this.players

    for(let i = 0; i < playerList.length; i++){
      console.log("playerList[i].playerId",playerList[i].playerId);
      if((playerList[i].playerId) == getFromSessionStorage("player_id")){

      setFromSessionStorage("team",playerList[i].team);

      }
    }
    this.players = playerList.map(player => new Player(player.pseudo, player.team, 2,player.playerId));


    for(let i = 0; i < this.players.length; i++){
      console.log("Player :",i);
      console.log("this.players[i].pseudo",this.players[i].name);
      console.log("this.players[i].id",this.players[i].id);
      console.log("this.players[i].team",this.players[i].team); 
    }
  });
  


  
  // console.log("Listening to playerListUpdate event from the server");

  //Listeners 2 for the Team Update
  // Listen to the 'teamUpdate' event from the server
 


},
// beforeUnmount() {
//   socket.off('playerListUpdate', (this.gameCode));
//   },

data() {
  return {
    players: [],
  };
},

methods: {}
//   async retrievePlayerProfile() {
//   try {
//     // const temp = getPlayerIdFromSessionStorage();
//     // if (temp == null) {
//     //   this.$router.push({ name: 'Profile', params: { gameCode: this.gameCode } });
//     // }

//     // Retrieve the initial player list
//     const playerList = await getPlayerIDList(this.gameCode);

//     // Check if the player list has changed
//     if (JSON.stringify(playerList) !== JSON.stringify(this.players)) {
//       // Update your local players array
//       this.players = playerList.map(player => new Player(player.pseudo, 3));
//     }

//     console.log("PlayerList retrieved from the server:", playerList);
//     return playerList;  
//   } catch (error) {
//     console.error(error);
//   }
// },
// },
};
 
</script>

<style scoped>
.gameOptions{
  width: 50%;
  margin: 5% 5%;
  border-right: 2px solid rgba(38,41,45,0.8);
}
.playerProfile{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width:30%;
  margin: 5% 5%;
  transition: 0.2s;
}
.container{
  background: #2c3e50;
  display: flex;
  justify-content: space-between;
  margin: 0 10%;
  border-radius: 20px;
  max-height: 800px;
  box-shadow: black 0 0 10px;
  margin-top: 60px;
}
.playerProfile :hover{
  border-radius: 20px;
  /*Zoom*/
  transform: scale(1.1);
  transition: 0.4s;
}
@media only screen and (max-width: 600px) {
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .playerProfile{
    grid-template-columns: 1fr;
  }
}

</style>