<template>
  <div class="container">
    <div class="profile">
      <img :src="getPicture(data.firstPlayer)">
      <p>{{getName(data.firstPlayer)}}</p>
    </div>
    <div class="profile">
      <img :src="getPicture(data.secondPlayer)">
      <p>{{getName(data.secondPlayer)}}</p>
    </div>
    <div class="progress">
      <progress max="100" :value="progressValue" :class="[progressValue > 40 ? 'mid' : 'low' , progressValue > 80 ? 'high' : 'low']"></progress>
      <p class="progressText">{{progressText}}/5</p>
    </div>
  </div>
</template>

<script>
import confettiModule from "canvas-confetti";
export default {
  name: "ProgressBarComponent",
  props : ["data","maxScore"],
  data() {
    return {
      progressValue:0,
      pictures : [require("../assets/profilePicture/picture1.png"),require("../assets/profilePicture/picture2.png"),require("../assets/profilePicture/picture3.png"),require("../assets/profilePicture/picture4.png"),require("../assets/profilePicture/picture5.png"),require("../assets/profilePicture/picture6.png"),require("../assets/profilePicture/picture7.png"),require("../assets/profilePicture/picture8.png"),require("../assets/profilePicture/picture9.png"),require("../assets/profilePicture/picture10.png")],
    }
  },
  computed:{
    progressText: function (){
      return Math.trunc(this.progressValue/20)
    },
    score : function (){
      console.log("score",this.data.score)
      return this.data.score
    }
  },
  mounted() {
    this.incrementProgress(this.score)
  },
  methods: {
    incrementProgress(value){
      let timeout = 10
      if (this.progressValue < value) {
        this.progressValue += 0.5
        setTimeout(() => {
          this.incrementProgress(value)
        }, timeout);
      }else if (value >= this.maxScore){
        confettiModule({
          particleCount: 800,
          spread: 200,
          origin: { y: 0.6 }
        });
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
  }
}
</script>

<style scoped>
*{
  transform: none;
  :hover{
    transform: none;
  }
}
.container{
  display: grid;
  background: rgba(44,62,80,1);
  grid-template-columns: 0.5fr 0.5fr 4fr;
  border-radius: 20px;
  margin: 10px;
  box-shadow: black 0 0 10px;

}
p{
  color: white;
  font-weight: bold;
}
img{
  margin: 0 auto;
  width: 70%;
}
.progress{
  background: #233140;
  padding: 0;
  border-radius: 0 20px 20px 0;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
}
.profile{
  padding-top: 10px;
}
progress{
  background-color: #371d10;
  color : green;
  border-radius: 100px;
  width: 70%;
  height: 40%;
  margin:auto auto;
  box-shadow: black 0 0 5px;
}
progress::-webkit-progress-bar{
  background-color: #371d10;
  border-radius: 100px;
}
progress::-webkit-progress-value {
  background-color: green;
  border-radius: 100px;
}
.low::-webkit-progress-value {
  background-color: red;
}
.mid::-webkit-progress-value {
  background-color: orange;
}
.high::-webkit-progress-value {
  background-color: green;
}
.progressText{
  margin: auto auto;
  padding: 0;
  font-size: 40px;
}
@media only screen and (max-width: 600px) {
  .container{
    width: 100%;
    margin: 10px 0;
    grid-template-columns: 20% 20% 60%;
  }
  .progressText{
    font-size: 30px;
  }
  progress{
    width: 90%;
  }
}
</style>