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
        console.log("Before calling getPlayerIDList");
        const playerList = await getPlayerIDList(this.gameCode);
        console.log("Test");
        console.log("PlayerList"+playerList);
        if (!playerList.includes(getPlayerIdFromSessionStorage())){
          this.$router.push({name:'Lobby',params:{gameCode:gameId}});
        }
        // const test = await getPlayerById("17005079277133484");
        // console.log(test);
        
        if (playerList && playerList.length > 0) {
          console.log('Player List:', playerList);
          for(let i = 0; i <= playerList.length;i++){
            this.players.push(new Player(playerList[i].pseudo,3));
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