<template>
  <div class="glass-panel">
    <div class="glass-logo">
      <img class="logo" src="../assets/logo.png">
      <h1 class="text">Alibi</h1>
    </div>
    <div class="progress-wrapper">
    <div class="progress-glass-panel">
      <div class="podium">
        <ProgressBarComponent :data="data" :maxScore="maxScore"></ProgressBarComponent>
        <ProgressBarComponent :data="data2" :maxScore="maxScore"></ProgressBarComponent>
      </div>
    </div>
    </div>
    <button @click="nextGame" class="glass-button">Next Game</button>
  </div>
</template>

<script>
import ProgressBarComponent from "@/components/ProgressBar.vue";
export default {
  name: "PodiumComponent",
  components: {
    ProgressBarComponent
  },
  data() {
    return {
      data : {
        player1 : {
          name : "Julien",
          picture : require("../assets/profilePicture/picture1.png")
        },
        player2 : {
          name : "Mathieu",
          picture : require("../assets/profilePicture/picture2.png")
        },
        score : 100
      },
      data2 : {
        player1 : {
          name : "Damien",
          picture : require("../assets/profilePicture/picture2.png")
        },
        player2 : {
          name : "Vianney",
          picture : require("../assets/profilePicture/picture3.png")
        },
        score : 80
      }
    }
  },
  methods: {
    nextGame(){
      this.$router.push({path:"/"})
    }
  },
  computed: {
    maxScore: function () {
      return this.data.score > this.data2.score ? this.data.score : this.data2.score
    }
  }
}

</script>

<style scoped>
.progress-wrapper{
  transition: 0.5s;
  :hover{
    transform: scale(1.05);
    transition: 0.5s;
  }
}
*{
  margin: 0 auto;
  padding: 0;
}
img{
  width: 15%;
}
h1{
  color: white;
  font-weight: bolder;
  font-size: 50px;
}
.podium{
  margin: 0 auto;
  align-content: center;
}
button{
  width: 40%;
  height: 150px;
  background: #2c3e50;
  color: white;
  box-shadow: black 0 0 10px;
  margin: 40px auto;
  font-weight: bold;
  font-size: 45px;
  border-radius: 20px;
}
.progress-glass-panel{
  color: #fff;
  margin: 20px auto;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  width: 90%;
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  align-content: center;
  box-shadow: black 0 0 5px;
  transform: none;
  transition: 0.5s;
  :hover{
    transform: none;
  }
}
.glass-panel {
  color: #fff;
  margin: 20px auto;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  width: 95%;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}
.glass-logo{
  display: inline-block;
  padding: 12px 12px;
  border: 0;
  margin: 10px auto;
  text-decoration: none;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(30px);
  color: rgba(255,255,255,0.8);
  font-size: 21px;
  letter-spacing: 2px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: black 0 0 5px;
  .logo,.text{
    transition: 0.5s;
  }
}
.glass-logo:hover{
  background-color: rgba(255,255,255,0.2);
  .logo{
    transform: scale(1.3);
    transition: 0.5s;
  }
  .text{
    transform: scale(1.1);
    transition: 0.5s;
  }
}
#app{
  margin-top: 10px;
}
img{
  width: 30%;
}
.glass-button {
  margin: 10px auto;
  margin-bottom: 30px;
  display: inline-block;
  padding: 24px 32px;
  border: 0;
  text-decoration: none;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(30px);
  color: rgba(255,255,255,0.8);
  font-size: 42px;
  letter-spacing: 2px;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.2s;
}
.glass-button:hover {
  background-color: rgba(255,255,255,0.2);
  transform: scale(1.1);
  transition: 0.2s;
 }
@media only screen and (max-width: 600px) {
  img{
    width: 40%;
  }
  button{
    width: 80%;
  }
  .glass-panel{
    width: 100%;
    background-color: rgba(1,1,1,0);
    border: none;
    .glass-logo{
      background-color: rgba(255,255,255,0.2);
    }
    .glass-button{
      background-color: rgba(255,255,255,0.2);
    }
    .progress-glass-panel{
      background-color: rgba(255,255,255,0.2);
    }
  }
  .glass-button,.glass-logo{
    margin: 0 auto;
  }
}
</style>