<template>
  <div class="containerOptions">
    <h2>Options of this game :</h2>
    <h3>{{gameCode}}</h3>
    <div class="timerOptions">
      <button class="rightButton" @click="decrement">-</button>
      <p>{{timer}}s</p>
      <button class="leftButton" @click="increment">+</button>
    </div>
    <div class="start">
      <button class="startButton" @click="startGame">Start Game</button>
      <div class="share">
        <button class="shareButton" @click="shareGame">Share</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOptions",
  data(){
    return{
      timer: 60,
      gameCode : localStorage.getItem("gameCode")
    }
  },
  methods:{
    increment(){if (this.timer < 120) {this.timer += 10;}},
    decrement(){if(this.timer > 10){this.timer -=10}},
    startGame(){
      //Pass the timer to the Alibi Component :
      this.$router.push({name:'Alibi',params:{timerPassed:this.timer}})
    },
    shareGame(){
      //retrieve gameCode from localstorage :
      //Copy to clipboard an url
      navigator.clipboard.writeText("http://localhost:8080/"+this.gameCode).then(function() {
        //Show the player it has been copied succesfully
        alert("Link copied successfully")
      }, function() {
        console.error("Unable to write to clipboard. :-(");
      });
    }
  },
}
</script>

<style scoped>
h3{margin-top: 0;}
h2{margin-bottom: 0;}
.containerOptions{
  color: white;
  justify-content: center;
  text-align: center;
}
.timerOptions{
  display: flex;
  text-align: center;
  margin: 0 auto;
  width: 40%;
  background: rgba(149,62,64,1);
  border-radius: 20px 20px 20px 20px;
  justify-content: space-between;
  font-weight: bold;
  box-shadow: black 0 0 10px;
}
button{
  width: 20%;
  border-radius: 20px;
  margin: 0;
  background: white;
  color: black;
  font-weight: bold;
  font-size: 20px;
  border: solid rgba(149,62,64,1) 2px;
  box-shadow: black 0 0 10px;
}
.rightButton{
  border: 1px solid #fff;
  border-left-color: white;
  border-radius: 20px;
}
.leftButton{
  border: 1px solid #fff;
  border-left-color: white;
  border-radius: 20px;
}
.startButton{
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  background: rgba(149,62,64,1);
  color: white;
  font-weight: bold;
  font-size: 20px;
  box-shadow: black 0 0 10px;
  /*Position the element at the bottom of the container : */
}
.shareButton{
  width: 80%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.8);
  color: rgba(149,62,64,1);
  font-size: 15px;
  box-shadow: black 0 0 10px;
  /*Position the element at the bottom of the container : */
}
.start{
  display: grid;
  grid-template-columns: 80% 20%;
  margin-top: 10%;
}
@media only screen and (max-width: 600px) {
  .start{
    grid-template-columns: 90%;
  }
  .shareButton{
    margin: 10px auto;
  }
  .timerOptions{
    width: 90%;
    margin: 0 auto;
  }
  .rightButton, .leftButton{
    width: 30%;
  }
}
</style>