<template>
  <div class="containerOptions">
    <h2>Options of this game :</h2>
    <h3>{{gameCode}}</h3>
    <div class="timerOptions">
      <button class="rightButton" @click="decrement">-</button>
      <p>{{timer}}s</p>
      <button class="leftButton" @click="increment">+</button>
    </div>
    <div class="gameMode" :style="gridStyle">
      <option-card v-for="game in gameMode" :key="game.name" :game-name="game.name" :game-image="game.image" @voted="(value) => game.value = value"></option-card>
    </div>
    <div class="start">
      <button class="startButton" @click="startGame">Start Game</button>
      <div class="share" :class="{'activeCopied':this.copied}">
        <button class="shareButton" @click="shareGame">{{share}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import OptionCard from "@/components/OptionCard.vue";
export default {
  name: "GameOptions",
  components: {OptionCard},
  props: ["gameCode"],
  computed:{
    gridStyle(){
      //Si < 680 width :
      if(window.innerWidth < 600) {
        return {
          gridTemplateRows : `repeat(${this.gameMode.length/2},${(this.gameMode.length / 2) % 100});`
        }
      }
      else{
        return{
          gridTemplateRows: `repeat(${this.gameMode.length/4},${(this.gameMode.length/4)%100});`
        }
      }
    }
  },
  data(){
    return{
      timer: 60,
      copied: false,
      share: "Share",
      gameMode:[
          {name: "Ink Splash", value:false, image: require("../assets/Ink Effect.png")},
          {name: "Tsunami", value:false, image: require("../assets/Wave Effect.png")},
          {name: "Vanish", value:false, image: require("../assets/Vanish Effect.png")},
          {name: "Fire",value:false, image: require("../assets/Fire Effect.png")}
      ],
    }
  },
  methods:{
    increment(){if (this.timer < 120) {this.timer += 10;}},
    decrement(){if(this.timer > 10){this.timer -=10}},
    startGame(){
      //Pass the timer to the Alibi Component :
      if (this.checkTeam()) {
        localStorage.setItem("Ink",this.gameMode[0].value)
        localStorage.setItem("Tsunami",this.gameMode[1].value)
        localStorage.setItem("Vanish",this.gameMode[2].value)
        localStorage.setItem("Fire",this.gameMode[3].value)
        this.$router.push({name: 'Alibi', params: {timerPassed: this.timer}})
      }else{
        alert("Teams are not balanced")
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
      return true
    }
  },
  mounted() {
    localStorage.setItem("Tsunami",false)
    localStorage.setItem("Ink",false)
    localStorage.setItem("Vanish",false)
    localStorage.setItem("Fire",false)
  }
}
</script>

<style scoped>
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
  cursor: pointer;
  transition: 0.2s;
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
.startButton:hover{
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