<template>
  <div class="container circle">
    <h2>Your alibi :</h2>
    <h4>Time left : <span>{{timer}}</span> seconds</h4>
    <p class="alibiText"><span style="opacity: 0">{{firstWord}}</span><span style="color: red">{{words[0]}}</span> <span style="color: #ff843c">{{words[1]}}</span> <span style="color: yellow">{{words[2]}}</span> {{alibi}}</p>
    <div v-if="gameMode.tsunami === 'true'" class="wave" :class="{'waveBegin':beginAnim}"></div>
    <div v-if="gameMode.ink === 'true'" style="">
      <TransitionGroup name="fade">
        <div v-for="index in parseInt(imagesIndex)" :key="index" class="group-Ink">
          <img :style="positionArray[index-1]" src="../assets/Ink%20effect.png">
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import {getFromSessionStorage, setFromSessionStorage, getAlibibyTeam} from "../crude.js";
export default {
  name: "AlibiComponent",
  props:["alibiIndex","timerPassed"],
  data(){
    return{
      alibi : "",
      words: [],
      timer : this.timerPassed,
      beginAnim: false,
      timerAnim: this.timerPassed+"s",
      timerTransition : (parseInt(this.timerPassed)+parseInt(20))+"s",
      firstWord:"",
      positionArray:[],
      imagesIndex:0,
      gameMode:{
        tsunami: localStorage.getItem('Tsunami'),
        ink: localStorage.getItem('Ink'),
        vanish : localStorage.getItem('Vanish'),
        fire:localStorage.getItem("Fire"),
      },
    }
  },
  computed:{ 
  },
  async mounted() {
    console.log("Alibi mounted ça passe ptn");
    let alibi_info = await getAlibibyTeam(getFromSessionStorage("game_id"),getFromSessionStorage("team"));
    alibi_info = alibi_info.alibi_info;
    console.log("alibi info :",alibi_info);
    console.log("OKOK");
    console.log("Alibi Text:", alibi_info.text);
    console.log("SVP");

    for(let i = 0; i<alibi_info.questions.length;i++){
      setFromSessionStorage("question"+i,alibi_info.questions[i]);
    }
    this.alibi = alibi_info.text;
    this.startTimer()
    if(this.gameMode.ink === 'true'){
      this.startInkGeneration()
    }
    if(this.gameMode.vanish === 'true'){
      this.startVanishTimer()
    }
    if(this.gameMode.fire === 'true'){
      const words = this.alibi.split(/\s+/);
      this.words = words.slice(0,3)
      this.alibi = (words.slice(3)).join(" ")
      this.startFireTimer()
    }
    setTimeout(() => {
      this.beginAnim = true
    }, 1000);
  },
  methods:{
    startTimer(){
      setInterval(() => {
        if(this.timer > 0){
          this.timer -= 1
        }
        if (this.timer === 0){
          this.$router.push({name:'Questions'})
          this.timer = -1
        }
      }, 1000);
    },
    startInkGeneration(){
      if(this.timer > 0 ) {
        setTimeout(() => {
          this.positionArray.push(this.generateRandomLocationStyle())
          this.imagesIndex += 1
          this.startInkGeneration()
        }, 5000);
      }
    },
    generateRandomLocationStyle(){
      //TODO : Generate random location for the ink that fit into .container div :
      console.log("generateRandomLocationStyle")
      const min = Math.ceil(10);
      const max = Math.floor(90);
      return {
        position: 'absolute',
        overflow: 'hidden',
        top: Math.floor(Math.random() * (max-min) + min) + '%',
        left: Math.floor(Math.random() * (max-min) + min) + '%',
        width: (Math.random() * (100-50) + 100)+ 'px',
        rotate: Math.floor(Math.random() * (360-0) + 0) + 'deg',
      }
    },
    startVanishTimer(){
      if(this.timer > 0 ) {
        setTimeout(() => {
          this.vanish()
          this.startVanishTimer()
        }, 5000);
      }
    },
    vanish(){
      console.log("fait un truc")
      function encrypt(text, shift) {
        return text
            .split('')
            .map(char => {
              if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);

                // Shift only letters (uppercase and lowercase)
                const shiftedCode =
                    code >= 65 && code <= 90
                        ? ((code - 65 + shift) % 26) + 65
                        : code >= 97 && code <= 122
                            ? ((code - 97 + shift) % 26) + 97
                            : code;

                return String.fromCharCode(shiftedCode);
              } else {
                return char;
              }
            })
            .join('');
      }
      // Split the text into an array of words
      const words = this.alibi.split(/\s+/);

      // Select a random index
      const randomIndex = Math.floor(Math.random() * words.length);

      // Replace the word at the random index with "void"
      words[randomIndex] = encrypt(words[randomIndex],5);

      // Join the array back into a string
      this.alibi = words.join(" ");
    },
    startFireTimer(){
      if(this.timer > 0 ) {
        setTimeout(() => {
          this.fire()
          this.startFireTimer()
        }, 250);
      }
    },
    fire(){
      //Get first three word of alibi :
      const words = this.alibi.split(/\s+/);
      const firstWord = this.words[0]
      this.words[0] = this.words[1]
      this.words[1] = this.words[2]
      this.words[2] = words[0]
      //Get length of first word :
      this.alibi = words.slice(1).join(" ")
      this.firstWord+=firstWord
      this.firstWord+= " "
    }
  }
}
</script>

<style scoped>
.fade-enter-active{
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
p{
  transition: 0.3s;
  font-family: Arial;
}
.circle {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 20%;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  cursor:pointer;
}
.wave {
  background:radial-gradient(rgba(63,104,197,1) 0%,rgba(63,104,197,1) 40% , rgba(63,104,197,0.5) 100%);
  position: absolute;
  top: 100%;
  height: 150%;
  width: 200%;
  border-radius: 38%;
  left: -50%;
  transform: rotate(360deg);
  transition: all v-bind(timerTransition) ease;
  animation: wave v-bind(timerAnim) linear infinite;
}
@keyframes wave {
  0% { transform: rotate(0deg); }
  20%{ transform: rotate(500deg); }
  40%{ transform: rotate(1000deg); }
  60%{ transform: rotate(1500deg); }
  80%{ transform: rotate(2000deg); }
  100% { transform: rotate(2500deg); }
}
.waveBegin {
  top: 0%;
}

h4,h2 {
  margin: 0 auto;
  padding: 0;
}
.container{
  width: 55%;
  margin: 0 auto;
  background: rgba(38,41,45,1);
  border-radius: 20px;
  color : white;
  box-shadow: black 0 0 10px;
  margin-top: 60px;
  padding: 20px;
}
span{
  color: red;
}
p{
  padding: 0 15px;
  /*Add line spacing :*/
  line-height: 1.5;
  font-size: 20px;
  text-align: justify;
}
.alibiText{
  padding: 0 15px;
  font-size: 20px;
  font-family: Arial;
  text-align: justify;
  line-height: 1.75;
}
@media only screen and (max-width: 600px) {
  .container,.circle{
    width: 95%;
    padding: 5px;
  }
  .wave{
    width: 400%;
    height: 100%;
    left: -100%;
  }
}
</style>