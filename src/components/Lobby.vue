<template>
  <div class="container">
    <div class="gameOptions">
      <GameOptions :gameCode="gameCode"></GameOptions>
    </div>
    <div class="playerProfile">
      <PlayerProfile v-for="player in players" :key="player.name" :playerGiven="player"></PlayerProfile>
    </div>
  </div>
</template>

<script>
import GameOptions from "@/components/GameOptions";

class Player {
  constructor(name, pictureIndex) {
    this.name = name;
    this.pictureIndex = pictureIndex;
    this.team = 0;
  }
}

import PlayerProfile from "./PlayerProfile.vue"
import {getPlayerIDList,getPlayerIdFromSessionStorage} from "../crude.js";
import io from 'socket.io-client';
export default {
  name: "LobbyComponent",
  props:["gameCode"],
  components: {
    GameOptions,
    PlayerProfile
  },
  mounted() {
    this.retrievePlayerProfile()

  },
  data(){
    return{
      players : [],
    }
  },
  methods:{
    async retrievePlayerProfile() {
  try {
    const temp = getPlayerIdFromSessionStorage();
    if (temp == null) {
      console.log("temp",temp);
      this.$router.push({ name: 'Profile', params: { gameCode: this.gameCode } });
    }

    if (!playerList.includes(temp)) {
      this.$router.push({ name: 'Profile', params: { gameCode: this.gameCode } });
    }

    console.log("Before calling getPlayerIDList");

    // Connect to the socket server
    const socket = io('http://localhost:4002');

    // Listen for the 'playerListUpdate' event
    socket.on('playerListUpdate', (updatedPlayerList) => {
      console.log('Received updated player list:', updatedPlayerList);

      // Check if the temp player is in the updated list
      if (!updatedPlayerList.some(player => player.playerId === temp)) {
        this.$router.push({ name: 'Profile', params: { gameCode: this.gameCode } });
      }

      // Filter out players that are already in the array
      const newPlayers = updatedPlayerList.filter(player => !this.players.some(existingPlayer => existingPlayer.playerId === player.playerId));

      // Push new players into the array
      for (const newPlayer of newPlayers) {
        this.players.push(new Player(newPlayer.pseudo, 3));
      }

      // Additional logic after updating the player array
    });

    // Retrieve the initial player list
    const playerList = await getPlayerIDList(this.gameCode);
    console.log("Test");
    console.log("PlayerList" + playerList);

    

    if (playerList && playerList.length > 0) {
      console.log('Player List:', playerList);
      for (let i = 0; i <= playerList.length; i++) {
        this.players.push(new Player(playerList[i].pseudo, 3));
      }
      // Additional logic after creating the player
    } else {
      console.log('Player list is empty or null');
    }
  } catch (error) {
    console.error(error);
  }
}
  }
}


 
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