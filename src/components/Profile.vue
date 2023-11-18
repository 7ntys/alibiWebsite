<template>
  <div class="thing">
    <div :class="{'container':!showRules,'containerActive':showRules}">
      <h1>Welcome to Alibi :</h1>
      <div class="carouselContainer">
        <PictureCarousel @changeProfilePictureIndex="profilePictureIndex = $event"></PictureCarousel>
      </div>
      <form>
        <div class="input-container">
          <input v-model="username" type="text" placeholder="Username" maxlength="15">
          <label :class="{'overflow':this.username.length === 15}">{{username.length}}/15</label>
        </div>
        <div class="input-container">
          <input v-model="code" type="text" placeholder="Game code (if joining)" maxlength="6">
        </div>
        <button :class="{'greyButton':!this.showJoin}" @click="joinGame">Join Game</button>
        <button :class="{'greyButton':!this.showCreate}" @click="createGame">Create Game</button>
      </form>
    </div>
    <div class="dropdown" @click="ToggleRules">
      <h2>Rules</h2>
      <img :src="dropArrow" alt="dropdown arrow">
      <Transition name="fade">
        <div class="rules" v-if="showRules">
          <RulesComponent></RulesComponent>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import PictureCarousel from "@/components/PictureCarousel";
import RulesComponent from "@/components/Rules";
export default {
  name: "ProfileComponent",
  components: {RulesComponent, PictureCarousel},
  props:["gameCode"],
  data(){
    return{
      username:"",
      code: this.gameCode,
      dropArrow: require("../assets/Arrow Down.png"),
      showRules : false,
      profilePictureIndex : 0,
    }
  },
  methods:{
    createGame(event){
      event.preventDefault()
      if (this.showCreate) {
        //Generate a random number with 6 digits :
        this.code = Math.floor(100000 + Math.random() * 900000);
        //Write gameCode in localstorage under the name : "gameCode"
        localStorage.setItem("gameCode", this.code)
        this.$router.push({name: 'Lobby'})
      }
    },
    joinGame(event){
      event.preventDefault()
      console.log("hey")
      /*Go to /lobby url*/
      if (this.showCreate && this.showJoin) {
        this.$router.push({name: 'Lobby'})
      }
    },
    ToggleRules(){
      if (this.showRules === false){
        this.dropArrow = require("../assets/Arrow Up.png")
        this.showRules = true;
      } else {
        this.dropArrow = require("../assets/Arrow Down.png")
        this.showRules = false;
      }
    },
    isMobile(){
      return (screen.width < 760)
    }
  },
  computed:{
    showJoin: function (){
      return this.gameCode.length === 6 && this.showCreate;
    },
    showCreate : function (){
      return this.username.length >= 5;
    }
  },
  mounted() {
    if (this.isMobile()) {
      this.ToggleRules()
    }
  }
}
</script>

<style scoped>
.overflow{
  color: red;
}
.containerActive{
  width: 100%;
  background: #2c3e50;
  color: white;
  position: relative;
  display: inline-block;
  border-radius: 20px 0 20px 20px;
  box-shadow: black 0 0 10px;
}
.container{
  width: 100%;
  background: #2c3e50;
  color: white;
  border-radius: 20px 0 20px 20px;
  position: relative;
  display: inline-block;
  box-shadow: black 0 0 10px;
}
.thing{
  width: 40%;
  margin: 0 auto;
}
H1{
  color : white;
  font-weight: bold;
  text-align: center;
}
input[type="text"]{
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  margin-left: 30px;
  display: inline-block;
  position: relative;
  box-shadow: black 0 0 10px;
}
button{
  width: 40%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  background: rgba(149,62,64,1);
  color: white;
  font-weight: bold;
}
label{
  position: absolute;
  right: 17px;
  top: 65%;
  transform: translateY(-50%);
  color: white;
  font-weight: bold;
}
/*make the dropdown menu appear at the right of the .container div :*/
.dropdown {
  position: fixed;
  margin: 0 auto;
  display: inline-block;
  background: rgba(149,62,64,1);
  border-radius: 0 20px 20px 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: black 5px 0px 10px;
}
.dropdown img {
  float: right;
  margin: 0;
  display: flex;
  width: 10%;
}
.dropdown h2 {
  float: left;
  margin: 0;
  display: flex;
  width: 90%;
}
/* Add a smooth transition on the rules component showing when clicking on the dropdown menu : */
.fade-enter-active{
  transition: opacity 0.5s ease-in-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
button{
  display: inline-block;
  margin: 15px;
  box-shadow: black 0 0 10px;
  cursor: pointer;
}
.greyButton{
  background: grey;
  color: white;
  cursor: default;
}
.carouselContainer{
  width: 50%;
  margin: 0 auto;
}
@media only screen and (max-width: 600px) {
  .thing{
    width: 100%;
  }
  .containerActive{
    border-radius: 20px;
  }
  .carouselContainer{
    width: 100%;
  }
  input[type="text"]{
    width: 80%;
  }
  button{
    width: 80%;
  }
  .dropdown{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    border-radius: 20px;
    margin-top: 10px;
  }
  .dropdown img{
    display: none;
  }
  .container{
    border-radius: 20px;
  }
  button{
    margin: 10px auto;
  }
  .overflow{
    display: none;
  }
  .input-container label{
    display: none;
  }
}

</style>