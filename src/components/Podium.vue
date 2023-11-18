<template>
  <div class="container">
    <img src="../assets/logo.png">
    <h1>Alibi</h1>
    <div class="podium">
      <ProgressBarComponent :data="data" :maxScore="maxScore"></ProgressBarComponent>
      <ProgressBarComponent :data="data2" :maxScore="maxScore"></ProgressBarComponent>
    </div>
    <button @click="nextGame">Next Game</button>
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
  margin: 20px auto;
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
@media only screen and (max-width: 600px) {
  img{
    width: 40%;
  }
  button{
    width: 80%;
  }
}
</style>