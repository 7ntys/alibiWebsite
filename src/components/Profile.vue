<template>
  <Transition name="fade">
  <div class="thing" v-if="isLoaded">
    <div :class="{'container':!showRules,'containerActive':showRules}">
      <h1>Welcome to Alibi :</h1>
      <div class="carouselContainer">
        <PictureCarousel @changeProfilePictureIndex="profilePictureIndex = $event"></PictureCarousel>
      </div>
      <form>
        <div class="input-container">
          <TextFieldComponent v-model="username" label="Username" limit="15"></TextFieldComponent>
        </div>
        <div class="input-container">
          <TextFieldComponent v-model="code" label="Game Code" limit="6"></TextFieldComponent>
        </div>
        <button :class="{'greyButton':!this.showJoin}" @click="joinGame">Join Game</button>
        <button :class="{'greyButton':!this.showCreate}" @click="createGame">Create Game</button>
      </form>
    </div>
    <div class="dropdowncontainer">
      <div class="dropdown" @click="ToggleDropdownRules">
        <h2>Rules</h2>
        <img :src="dropArrowRules" alt="dropdown arrow">
        <Transition name="fade">
          <div class="rules" v-if="showRules">
            <RulesComponent></RulesComponent>
          </div>
        </Transition>
      </div>
      <div class="dropdownSocial" @click="ToggleDropdownSocial">
        <h2>Social</h2>
        <img :src="dropArrowSocial" alt="dropdown arrow">
        <Transition name="fade">
          <div class="social" v-if="showSocial">
            <SocialComponent/>
          </div>
        </Transition>
      </div>
    </div>
  </div>
  </Transition>
  <div v-if="!isLoaded" :class="{'anim':isAnim}">
    <Transition name="fade">
      <PageLoader/>
    </Transition>
  </div>
</template>

<script>
import PictureCarousel from "@/components/PictureCarousel";
import RulesComponent from "@/components/Rules";
import SocialComponent from "@/components/SocialComponent.vue";
import PageLoader from "@/components/PageLoader.vue";
import TextFieldComponent from "@/components/TextFieldComponent.vue";
export default {
  name: "ProfileComponent",
  components: {TextFieldComponent, PageLoader, SocialComponent, RulesComponent, PictureCarousel},
  props:["gameCode"],
  data(){
    return{
      isLoaded:false,
      isAnim : false,
      username:"",
      code: this.gameCode,
      dropArrowSocial: require("../assets/Arrow Down.png"),
      dropArrowRules: require("../assets/Arrow Down.png"),
      showRules : false,
      showSocial : false,
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
    ToggleDropdownRules(){
      if (this.showRules === false){
        if(this.showSocial){
          this.showSocial = false;
          this.dropArrowSocial = require("../assets/Arrow Down.png")
        }
        this.dropArrowRules = require("../assets/Arrow Up.png")
        this.showRules = true;
      } else {
        this.dropArrowRules = require("../assets/Arrow Down.png")
        this.showRules = false;
      }
    },
    ToggleDropdownSocial(){
      if(this.showSocial === false){
        if(this.showRules){
          this.showRules = false;
          this.dropArrowRules = require("../assets/Arrow Down.png")
        }
        this.dropArrowSocial = require("../assets/Arrow Up.png")
        this.showSocial = true;
      }
      else {
        this.dropArrowSocial = require("../assets/Arrow Down.png")
        this.showSocial = false;
      }
    },
  },
  computed:{
    showJoin: function (){
      return this.code.length === 6 && this.username.length >= 5;
    },
    showCreate : function (){
      return this.username.length >= 5;
    }
  },
  mounted() {
    if(document.readyState === 'complete'){
      this.isAnim = true
      setTimeout(() => {
        this.isLoaded = true
      }, 1000);
      this.ToggleDropdownRules()
      return;
    }
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.isAnim = true
        setTimeout(() => {
          this.isLoaded = true
        }, 2000);
      }
    }
    this.ToggleDropdownRules()
  }
}
</script>

<style scoped>
.overflow{
  color: red;
}
a{
  color: white;
  text-decoration: none;
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
.input-container{
  width: 60%;
  margin: 10px auto;
}
.thing{
  width: 40%;
  margin: 0 auto;
  margin-top: 60px;
}
H1{
  color : white;
  font-weight: bold;
  text-align: center;
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

/*make the dropdown menu appear at the right of the .container div :*/
.dropdowncontainer{
  position: fixed;
  display: inline-block;
  width: 20%;
  margin: 0 0;
}
.dropdown {
  position: relative;
  margin: 0 auto;
  display: inline-block;
  background: rgba(149,62,64,1);
  border-radius: 0 20px 20px 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: black 5px 0px 10px;
  float: left;
}
.dropdownSocial {
  position: relative;
  margin: 5px auto;
  display: inline-block;
  background: rgba(149,62,64,1);
  border-radius: 0 20px 20px 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: black 5px 0px 10px;
  float: left;
}
.dropdown img,.dropdownSocial img {
  float: right;
  margin: 0;
  display: flex;
  width: 10%;
}
.dropdown h2,.dropdownSocial h2 {
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
a:hover{
  text-decoration: underline;
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
  .dropdowncontainer{
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    border-radius: 20px;
    margin-top: 10px;
  }
  .dropdown, .dropdownSocial{
    width: 90%;
    border-radius: 20px;
  }
  .dropdownSocial{
    margin:10px auto;
  }
  .rules{
    width: 100%;
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
.anim{
  animation: fade 1s ease-in-out;
}
PageLoader{
  transition: 0.5s;
}

</style>