<template>
  <div class="containerOptions" v-if="show">
    <h2>Options of this game :</h2>
    <h3 :class="[players.length < 4 ? 'waiting' : 'go']">Waiting for players : {{players.length}}/4</h3>
    <h3>{{gameCode}}</h3>
    <div class="timerOptions">
      <button class="rightButton" @click="decrement">-</button>
      <p>{{timer}}s</p>
      <button class="leftButton" @click="increment">+</button>
    </div>
    <div class="gameMode" :style="gridStyle">
      <option-card v-for="game in gameMode" :checked="game.value" :key="game.name" :game-name="game.name" :game-image="game.image" @voted="(value) => game.value = value"></option-card>
    </div>
    <div class="start">
      <button class="startButton" @click="startGame">Start Game</button>
      <div class="share" :class="{'activeCopied':this.copied}">
        <button class="shareButton" @click="shareGame">{{share}}</button>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 style="color: white;">The game starts in : {{tempTimer}} seconds</h1>
  </div>
</template>

<script>
import {getFromSessionStorage, updateGameSettings} from "../crude.js";
import io from 'socket.io-client';
const socket = io('http://localhost:4002', { transports: ['websocket'], debug: true });
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import OptionCard from "@/components/OptionCard.vue";
export default {
  name: "GameOptions",
  components: {OptionCard},
  props: ["gameCode","players"],
  computed:{
    gridStyle(){
      //Si < 680 width :
      if(window.innerWidth < 600) {
        return {
          gridTemplateRows : `repeat(${this.gameMode.length/2},${(this.gameMode.length / 2) % 100})`
        }
      }
      else{
        return{
          gridTemplateRows: `repeat(${this.gameMode.length/4},${(this.gameMode.length/4)%100})`
        }
      }
    },
  },
  data(){
    return{
      timer: 60,
      copied: false,
      share: "Share",
      tempTimer : 5,
      show:true,
      gameMode:[
          {name: "Ink Splash", value:false, image: require("../assets/Ink effect.png")},
          {name: "Tsunami", value:false, image: require("../assets/Wave Effect.png")},
          {name: "Vanish", value:false, image: require("../assets/Vanish Effect.png")},
          {name: "Fire",value:false, image: require("../assets/Fire Effect.png")}
      ],
      gameMaster : false,
    }
  },
  methods:{
    async increment(){if (this.timer < 120) {this.timer += 10;await updateGameSettings(this.gameCode, [this.timer,null,null,null,null])}},
    async decrement(){if(this.timer > 10){this.timer -=10;await updateGameSettings(this.gameCode, [this.timer,null,null,null,null])}},
    async startGame(){
      //Pass the timer to the Alibi Component :
      if (this.checkTeam() && this.isGameMaster()) { //this.checkTeam() && this.isGameMaster()

        await updateGameSettings(this.gameCode, [null,null,null,null,null,true])
        // this.$router.push({name: 'Alibi', params: {timerPassed: this.timer}})
      }else{
        alert("Teams are not balanced or you're less than 4 or you're not game Master")
      }
    },
    shareGame(){
      if(this.copied){return}
      //Copy to clipboard an url
      navigator.clipboard.writeText("http://localhost:8080/"+this.gameCode)
      //Make sure the user can't spam the button :
      this.copied = true
      this.share = "Copied !"
      new Notify ({
        status: 'success',
        title: 'Copied Successfully',
        text: '',
        effect: 'slide',
        speed: 300,
        customClass: 'notify',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 800,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'top x-center'
      })
      setTimeout(() => {
        this.copied = false
        this.share = "Share"
      }, 1000);
    },
    checkTeam(){
      //TODO : Check if the the team are well balanced :
      let blue = 0;
      let red = 0;
      this.players.forEach(player => {
        if (player.team === 1) {
          blue++;
        }
        else if(player.team === 2){
          red++;
        }
      });
      if(red === 2 && blue === 2){
        return true
      }
      else{
        return false
      }
    },
    isGameMaster(){
      console.log(this.players[0].id)
      return(this.players[0].id === getFromSessionStorage("player_id"))
    }

  },
  mounted() {
    localStorage.setItem("Tsunami",false)
    localStorage.setItem("Ink",false)
    localStorage.setItem("Vanish",false)
    localStorage.setItem("Fire",false)
  
    socket.connect();
    socket.emit('GameSettings', (this.gameCode));
    console.log("Emitting GameSettings event to the server");
    socket.on('GameSettings', ({ gameSettings }) => {
      console.log("Nouvelle valeur de GameSettings en temps réel", gameSettings);
      console.log("Test avect tsunami "+gameSettings.vanish)
      localStorage.setItem("Tsunami",gameSettings.tsunami);
      localStorage.setItem("Ink",gameSettings.ink);
      localStorage.setItem("Vanish",gameSettings.vanish);
      localStorage.setItem("Fire",gameSettings.fire);
      console.log(this.gameMode[0].value)
      this.gameMode[0].value = gameSettings.ink;
      this.gameMode[1].value = gameSettings.tsunami;
      this.gameMode[2].value = gameSettings.vanish;
      console.log(this.gameMode[2].value)
      this.gameMode[3].value = gameSettings.fire;
      this.timer = gameSettings.alibiTime;
      if(gameSettings.started){
        this.show = false
        //Create timer for 5 seconds :
        setInterval(() => {
          if(this.tempTimer > 0){
            this.tempTimer -= 1
          }
          if (this.tempTimer === 0){
            this.$router.push({name: 'Alibi', params: {timerPassed: this.timer}})
            this.tempTimer = -1
          }
        }, 1000);
      }
    });
  },
  beforeUnmount() {

    socket.off('GameSettings');
    // Stop listening to GameSettings when the component is about to unmount
    console.log("Disconnecting Listeners TAAAAH BOOOM (gameSettingsListener)");
  },
  // beforeUnmount() {
  //   socket.off('GameSettings', (this.gameCode));
  // }
}
</script>

<style scoped>
.waiting{
  color:red;
}
.go{
  color:green;
}
.gameMode{
  margin: 0 auto;
  margin-top: 10px;
  width: 100%;
  align-items: center;
  text-align: center;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
OptionCard{
  margin: 100px 100px;
}
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
  transition: 0.2s;
}
.timerOptions:hover{
  transform: scale(1.03);
  transition: 0.2s;
}
p{
  user-select: none;
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
  cursor: default;
  transition: 0.2s;
}
.ableToClick{
  cursor: none;
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
.rightButton:hover,.leftButton:hover{
  border-color: black;
  transform: scale(1.1);
  transition: 0.2s;
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
  transition: 0.2s;
}
.ableToClick:hover{
  transition: 0.2s;
  transform: scale(1.03);
}
.shareButton{
  width: 80%;
  height: 100%;
  transition: 0.2s;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.8);
  color: rgba(149,62,64,1);
  font-size: 15px;
  box-shadow: black 0 0 10px;
  /*Position the element at the bottom of the container : */
  transition: 0.2s;
}
.shareButton:hover{
    transition: 0.2s;
    transform: scale(1.05);
}
.activeCopied button{
  background-color: #3498db;
  transition: 0.2s;
  transform: scale(1.02);
  color: white;
}
.start{
  display: grid;
  grid-template-columns: 80% 20%;
  margin-top: 10%;
}
.notify{
  background-color: #3498db;
  color: white;
  border-radius: 10px;
  box-shadow: black 0 0 10px;
}
@media only screen and (max-width: 600px) {
  .gameMode{
    grid-template-columns: 50% 50%;
  }
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