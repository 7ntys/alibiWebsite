<template>
  <div :class="['containerProfile',this.player.team === 1 ? 'blue' : this.player.team === 2 ? 'red' : 'containerProfile']" @click="changeTeam()">
    <img :src="picture">
    <h2>{{player.name}}</h2>
  </div>
</template>

<script>
export default {
  name: "PlayerProfile",
  props:["playerGiven"],
  computed:{
    picture(){
      return require("../assets/profilePicture/picture"+this.player.pictureIndex+".png")
    },
    debouncedCallDb : function(){
      return this.debounce(this.CallDb,1000)
    }
  },
  data(){
    return{
      player : this.playerGiven
    }
  },
  methods:{
    changeTeam(){
      console.log("something")
      this.player.team = this.player.team === 1 ? 2 : this.player.team === 2 ? 1 : 1
      //update to Db after change only if user didn't click for 1 second :
      this.debouncedCallDb()
    },
    debounce(func, delay){
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    },
    CallDb(){
      //TODO : update to Db after change only if user didn't click for 1 second :
      console.log("update to db")
    }
  }
}
</script>

<style scoped>
.containerProfile{
  color:white;
  background: rgba(149,62,64,1);
  border-radius: 20px 20px 20px 20px;
  width: 100%;
  box-shadow: black 0 0 10px;
}
.containerProfile img{
  width: 50%;
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
  margin-top: 10px;
  user-select: none;
}
.containerProfile h2{
  padding: 0 0 10px 0;
  margin: 15px 0 auto;
  user-select: none;
}
.containerProfile img:hover,.containerProfile h2:hover{
  transform: scale(1);
  border-radius: 0;
}
.blue{
  background-color: #5151ea;
}
.red{
  background-color: #e75555;
}
</style>