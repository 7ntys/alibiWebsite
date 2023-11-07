<template>
  <div class="containerProfile">
    <img :src="picture">
    <h2>{{name}}</h2>
  </div>
</template>

<script>
export default {
  name: "PlayerProfile",
  props:["name","pictureIndex"],
  computed:{
    picture(){
      return require("../assets/profilePicture/picture"+this.pictureIndex+".png")
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
  box-shadow: none;
}
.containerProfile img{
  width: 50%;
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
  margin-top: 10px;
}
.containerProfile h2{
  padding: 0 0 10px 0;
  margin: 15px 0 auto;
}
.containerProfile img:hover,.containerProfile h2:hover{
  transform: scale(1);
}
</style>