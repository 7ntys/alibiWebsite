<template>
  <div class="containerOptions">
    <h2>Options of this game :</h2>
    <div class="timerOptions">
      <button class="rightButton" @click="decrement">-</button>
      <p>{{timer}}s</p>
      <button class="leftButton" @click="increment">+</button>
    </div>

    <div class="start">
      <button class="startButton" @click="startGame">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOptions",
  data(){
    return{
      timer: 60,
    }
  },
  methods:{
    increment(){if (this.timer < 120) {this.timer += 10;}},
    decrement(){if(this.timer > 10){this.timer -=10}},
    startGame(){
      //Pass the timer to the Alibi Component :
      this.$router.push({name:'Alibi',params:{timerPassed:this.timer}})
    }
  },
}
</script>

<style scoped>
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
  width: 40%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  background: rgba(149,62,64,1);
  color: white;
  font-weight: bold;
  font-size: 20px;
  box-shadow: black 0 0 10px;
  /*Position the element at the bottom of the container : */
  margin-top: 10%;
}
</style>