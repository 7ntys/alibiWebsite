<template>
  <div class="thing">
    <div :class="{'container':!showRules,'containerActive':showRules}">
      <h1>Welcome to Alibi :</h1>
      <div class="carouselContainer">
        <PictureCarousel @changeProfilePictureIndex="profilePictureIndex = $event"></PictureCarousel>
      </div>
      <form>
        <div class="input-container">
          <input  id="pseudonym" v-model="username" type="text" placeholder="Username" maxlength="15">
          <label :class="{'overflow':username.length === 15}">{{username.length}}/15</label>
        </div>
        <div class="input-container">
          <input v-model="gameCode" type="text" placeholder="Game code (if joining)" maxlength="6">
        </div>
        <button :class="{'greyButton':!showJoin}" @click="joinGame">Join Game</button>
        <button :class="{'greyButton':username.length < 5}" @click="create_game()">Start game</button>
      </form>
    </div>
    <div class="dropdown" @click="ToggleRules()">
      <h2>Rules</h2>
      <img :src="dropArrow" alt="dropdown arrow">
      <Transition name="fade">
        <div class="rules" v-if="showRules">
          <RulesComponent></RulesComponent>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
/* eslint-disable */

import {getPlayerById,startGame,getPlayerIdFromSessionStorage,setPlayerIdFromSessionStorage,generateId} from "../crude.js";
import PictureCarousel from "@/components/PictureCarousel";
import RulesComponent from "@/components/Rules";
export default {
  name: "ProfileComponent",
  components: {RulesComponent, PictureCarousel},
  data(){
    return{
      username:"",
      gameCode:"",
      dropArrow: require("../assets/Arrow Down.png"),
      showRules : false,
      profilePictureIndex : 0,
    }
  },
  methods:{


    async create_game() {
      const usernameInput = document.getElementById("pseudonym");
      const username = usernameInput.value;
      if (username.trim() === "") {
      alert("Please enter a pseudonym.");
    } else {
      try {
        console.log("username : " + username);
        let temp = getPlayerIdFromSessionStorage();
        if(temp == null){temp = generateId();}
        const playerId = temp;
        console.log("player id init by function after : "+playerId);
        setPlayerIdFromSessionStorage(playerId); 
        console.log("playerId storage : " + getPlayerIdFromSessionStorage());
        await startGame(username,playerId);
        console.log("playerId : " + playerId);
        console.log('Game creatd');
        // Additional logic after creating the player
      } catch (error) {
        console.error(error);
      }
    }},

    async joinGame() {
      try {
        console.log("T");
        console.log("Before calling getPlayerById");
        await getPlayerById("yvvvEhGZ9JSJ7gkUKFcd");
        console.log('Test');
        // Additional logic after creating the player
      } catch (error) {
        console.error(error);
      }
    },

    ToggleRules(){
      if (this.showRules === false){
        this.dropArrow = require("../assets/Arrow Up.png")
        this.showRules = true;
      } else {
        this.dropArrow = require("../assets/Arrow Down.png")
        this.showRules = false;
      }
    }
  },
  computed:{
    showJoin(){
      return this.gameCode.length == 6 && this.username.length >= 5;
    },
  }
}

</script>

<style scoped>
.overflow{
  color: red;
}
.containerActive{
  width: 100%;
  background: #2c3e50;
  color: white;
  position: relative;
  display: inline-block;
  border-radius: 20px 0 20px 20px;
  box-shadow: black 0 0 10px;
}
.container{
  width: 100%;
  background: #2c3e50;
  color: white;
  border-radius: 20px 0 20px 20px;
  position: relative;
  display: inline-block;
  box-shadow: black 0 0 10px;
}
.thing{
  width: 40%;
  margin: 0 auto;
}
H1{
  color : white;
  font-weight: bold;
  text-align: center;
}
input[type="text"]{
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  margin-left: 30px;
  display: inline-block;
  position: relative;
  box-shadow: black 0 0 10px;
}
button{
  width: 40%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  background: rgba(149,62,64,1);
  color: white;
  font-weight: bold;
}
label{
  position: absolute;
  right: 17px;
  top: 65%;
  transform: translateY(-50%);
  color: white;
  font-weight: bold;
}
/*make the dropdown menu appear at the right of the .container div :*/
.dropdown {
  position: fixed;
  margin: 0 auto;
  display: inline-block;
  background: rgba(149,62,64,1);
  border-radius: 0 20px 20px 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: black 5px 0px 10px;
}
.dropdown img {
  float: right;
  margin: 0;
  display: flex;
  width: 10%;
}
.dropdown h2 {
  float: left;
  margin: 0;
  display: flex;
  width: 90%;
}
/* Add a smooth transition on the rules component showing when clicking on the dropdown menu : */
.fade-enter-active{
  transition: opacity 0.5s ease-in-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
button{
  display: inline-block;
  margin: 15px;
  box-shadow: black 0 0 10px;
  cursor: pointer;
}
.greyButton{
  background: grey;
  color: white;
  cursor: default;
}
.carouselContainer{
  width: 50%;
  margin: 0 auto;
}
</style>