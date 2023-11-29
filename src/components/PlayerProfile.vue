<template>
  <div :class="['containerProfile',this.player.team === 1 ? 'blue' : this.player.team === 2 ? 'red' : 'containerProfile']" @click="changeTeam()">
    <img :src="picture">
    <h2>{{player.name}}</h2>
  </div>
</template>

<script>
import {getFromSessionStorage,updatePlayerTeam} from "../crude.js";
export default {
  name: "PlayerProfile",
  props:["playerGiven"],
  computed:{
    picture(){
      return require("../assets/profilePicture/picture"+this.player.pictureIndex+".png")
    },
    debouncedCallDb : function(){
      return this.debounce(this.CallDb,1000)
    }
  },
  data(){
    return{
      player : this.playerGiven
    }
  },
  updated() {
    this.player = this.playerGiven
  },
  methods:{
    changeTeam(){
      console.log("something")
      if (getFromSessionStorage("player_id") === this.player.id) {
        this.player.team = this.player.team === 1 ? 2 : this.player.team === 2 ? 1 : 1
        //update to Db after change only if user didn't click for 1 second :
        this.debouncedCallDb()
      }
      else{
        console.log("You can't change other player's team")
      }
    },
    debounce(func, delay){
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    },
    async CallDb(){
      try {
        console.log("CalltoDb")
      //TODO : update to Db after change only if user didn't click for 1 second :
      await updatePlayerTeam(getFromSessionStorage("game_id"),getFromSessionStorage("player_id"),this.player.team);
        console.log(this.player.team)
      } catch (error) {
        console.log(error);
      }

    }
  }
}
</script>

<style scoped>
.containerProfile{
  color:white;
  background: rgba(149,62,64,1);
  border-radius: 20px 20px 20px 20px;
  width: 100%;
  max-height: 100%;
  box-shadow: black 0 0 10px;
  transition: 0.2s;
}
.containerProfile img{
  width: 50%;
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
  margin-top: 10px;
  user-select: none;
}
.containerProfile h2{
  padding: 0 0 10px 0;
  margin: 15px 0 auto;
  user-select: none;
}
.containerProfile img:hover,.containerProfile h2:hover{
  transform: scale(1);
  border-radius: 0;
}
.blue{
  background-color: #5151ea;
}
.red{
  background-color: #e75555;
}
</style>