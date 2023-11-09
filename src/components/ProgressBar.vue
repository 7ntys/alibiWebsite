<template>
  <div class="container">
    <div class="profile">
      <img src="../assets/profilePicture/picture1.png">
      <p>Player 1</p>
    </div>
    <div class="profile">
      <img src="../assets/profilePicture/picture2.png">
      <p>Player 2</p>
    </div>
    <div class="progress">
      <progress max="100" :value="progressValue"></progress>
      <p class="progressText">{{progressValue%5}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBarComponent",
  components: {
  },
  data() {
    return {
      progressValue:0,
    }
  },
  computed:{
    progressText: function (){
      return this.progressValue%5
    }
  },
  mounted() {
    this.incrementProgress(100)
  },
  methods: {
    incrementProgress(value){
      let timeout = 10
      if (this.progressValue < value) {
        this.progressValue += 1
        if (this.progressValue > 10){timeout = 15}
        if (this.progressValue > 30){timeout = 20}
        if (this.progressValue > 50){timeout = 25}
        if (this.progressValue > 70){timeout = 30}
        setTimeout(() => {
          this.incrementProgress(value)
        }, timeout);
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
  grid-template-columns: 1fr 0.1fr;
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
.progressText{
  margin: auto auto;
  padding: 0;
}
</style>