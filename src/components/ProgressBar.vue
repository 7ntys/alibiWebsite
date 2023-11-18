<template>
  <div class="container">
    <div class="profile">
      <img :src="data.player1.picture">
      <p>{{data.player1.name}}</p>
    </div>
    <div class="profile">
      <img :src="data.player2.picture">
      <p>{{data.player2.name}}</p>
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
    }
  },
  computed:{
    progressText: function (){
      return Math.trunc(this.progressValue/20)
    },
    score : function (){
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
      }else if (value === this.maxScore){
        confettiModule({
          particleCount: 800,
          spread: 200,
          origin: { y: 0.6 }
        });
      }
    }
  }
}
</script>

<style scoped>
.container{
  display: grid;
  background: #2c3e50;
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