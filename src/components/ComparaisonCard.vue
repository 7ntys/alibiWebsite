<template>
  <div class="component">
    <h2 class="question">{{question}}</h2>
    <div class="answer">
      <div class="profile">
        <img :src="(getPicture(player0))">
        <p class="username">{{getName(player0)}}</p>
      </div>
      <div class="profile">
        <img :src="(getPicture(player1))">
        <p class="username">{{getName(player1)}}</p>
      </div>
      <p class="answer0">{{answers0}}</p>
      <p class="answer1">{{answers1}}</p>
    </div>
    <div>
      <button v-if="vote === 0 || vote === 2" @click="Submitvote(0)" :class="[vote === 0 ? 'dislikedAnim' : 'disliked']"><img src="../assets/Cross.png"></button>
      <button v-if="vote === 1 || vote === 2" @click="Submitvote(1)" :class="[vote === 1 ? 'likedAnim' : 'liked']"><img src="../assets/Check.png"></button>
    </div>
  </div>
</template>
<script>
import {getFromSessionStorage} from "@/crude";

export default {
  name: 'ComparaisonCard',
  props: ["player0","player1","answers0","answers1","question","vote"],
  data(){
    return{
      pictures : [require("../assets/profilePicture/picture1.png"),require("../assets/profilePicture/picture2.png"),require("../assets/profilePicture/picture3.png"),require("../assets/profilePicture/picture4.png"),require("../assets/profilePicture/picture5.png"),require("../assets/profilePicture/picture6.png"),require("../assets/profilePicture/picture7.png"),require("../assets/profilePicture/picture8.png"),require("../assets/profilePicture/picture9.png"),require("../assets/profilePicture/picture10.png")],
    }
  },
  computed:{

  },
  methods:{
    Submitvote(value){
      let x = true
      if(x){
        if (value === this.vote) {
          console.log("reset")
          value = 2
          this.$emit('voteSubmitted', value)
        }
        else {
          console.log(value)
          this.$emit('voteSubmitted', value)
        }
      }
    },
    getPicture(player){
      if(player == null){return this.pictures[0]}
      else{return this.pictures[player.pictureIndex-1]}
    },
    getName(player){
      if(player == null){return "No name"}
      else{return player.name}
    },
    getImageFromPath(path){
      return (path)
    },
    isGameMaster(){
      console.log(this.players[0].id)
      return(this.players[0].id === getFromSessionStorage("player_id"))
    }
  },

}
</script>
<style scoped>
.component {
  background-color: #2c3e50;
  color: white;
  width: 50%;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: black 0 0 10px;
}

.question {
  font-weight: bold;
  border-bottom: grey 1px solid;
  padding: 10px;
}

.answer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
  margin: 0 auto;
  width: 100%;
  border-bottom: grey solid 1px;
}

.username {
  margin: 0 auto;
  padding: 0px;
  font-weight: bold;
}

.profile {
  border-bottom: grey solid 1px;
  padding: 10px 0;
}

.answer img {
  margin: 0 auto;
  width: 20%;
}

button {
  background: #233140;
  border: none;
  font-size: 40px;
  box-shadow: black 0 0 5px;
  margin: 15px 10px 20px 10px;
  padding: 0px 10px;
  border-radius: 20px;
  cursor: pointer;
}

button img {
  margin: 0 auto;
  padding-top: 10px;
}
.disliked{
  color: red;
  transition: 0.2s;
}
.liked{
  color: green;
  transition: 0.2s;
}
.disliked:hover{
  color: black;
  background: rgba(255,0,0,0.3);
  transform: scale(1.2);
  transition: 0.1s;
}
.liked:hover{
  color: black;
  background: rgba(0,255,0,0.3);
  transform: scale(1.2);
  transition: 0.1s;
}
button img {
  margin: 0 auto;
  padding-top: 10px;
}
.likedAnim{
  background: rgba(0,255,0,0.3);
}
.dislikedAnim{
  background: rgba(255,0,0,0.3);
}
@media only screen and (max-width: 600px) {
  .component{
    width: 90%;
  }
  .profile img{
    width: 50%;
  }
}
</style>