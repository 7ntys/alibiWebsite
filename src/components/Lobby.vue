<template>
  <div class="container">
    <div class="gameOptions">
      <GameOptions></GameOptions>
    </div>
    <div class="playerProfile">
      <PlayerProfile v-for="player in players" :key="player.name" :name="player.name" :pictureIndex="player.pictureIndex"></PlayerProfile>
    </div>
  </div>
</template>

<script>
import GameOptions from "@/components/GameOptions";

class Player {
  constructor(name, pictureIndex) {
    this.name = name;
    this.pictureIndex = pictureIndex;
  }
}

import PlayerProfile from "./PlayerProfile.vue"

export default {
  name: "LobbyComponent",
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
    retrievePlayerProfile(){
      //TODO : Retrieve player from firebase database that are present in the lobby :
      //Store in a Player object (including name and profile picture index), then in an array
      console.log("Bonjour")
      this.players.push(new Player("Player1",2))
      this.players.push(new Player("Player2",1))
      this.players.push(new Player("Player3",3))
      this.players.push(new Player("Player4",2))
      this.players.push(new Player("Player5",1))
      this.players.push(new Player("Player6",1))
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
}
.playerProfile :hover{
  background-color: darkred;
  border-radius: 20px;
  /*Zoom*/
  transform: scale(1.1);
}

</style>