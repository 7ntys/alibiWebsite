<template>
  <div class="container circle">
    <h2>Your alibi :</h2>
    <h4>Time left : <span>{{timer}}</span> seconds</h4>
    <p><span style="opacity: 0">{{firstWord}}</span><span style="color: red">{{words[0]}}</span> <span style="color: #ff843c">{{words[1]}}</span> <span style="color: yellow">{{words[2]}}</span> {{alibi}}</p>
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
  mounted() {
    this.getAlibiFromIndex()
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
    getAlibiFromIndex(){
      //TODO : Go through the database of alibi, take the alibi with the index 'alibiIndex' and then implement it in the alibi variable
      this.alibi = "Le jour de l'incident, nous étions tous les deux à bord de la station spatiale ___________, située en orbite autour de la planète ___________. " +
          "Nous faisions partie d'une équipe de chercheurs et d'astronautes qui travaillait sur une mission d'exploration spatiale " +
          "passionnante.  La journée avait commencé avec des expériences scientifiques dans le laboratoire de la station spatiale. " +
          "Nous avons étudié ___________ un sujet qui étaient au cœur de nos recherches. Tout se déroulait comme prévu jusqu'à ce que " +
          "nous recevions une alerte indiquant une défaillance mineure dans l'un des systèmes vitaux de la station spatiale.  Nous " +
          "avons rapidement quitté le laboratoire pour nous rendre dans la salle de contrôle, où nous avons travaillé avec l'équipe " +
          "technique pour résoudre le problème. Cela a pris un certain temps, mais nous avons réussi à corriger la défaillance et à " +
          "ramener tous les systèmes à leur fonctionnement normal.  Ensuite, nous avons eu une courte pause pour prendre un repas. " +
          "Nous avons dégusté des plats spéciaux préparés avec soin pour l'équipage de la station spatiale, notamment des ___________ . " +
          "Après avoir mangé, nous avons pris un moment pour nous détendre et admirer la vue spectaculaire de la planète ___________ " +
          "depuis les hublots de la station.  En fin d'après-midi, nous avons participé à une séance d'entraînement physique pour maintenir notre " +
          "condition physique dans l'espace. Nous avons effectué des exercices tels que ___________ et ___________, qui nous aident à " +
          "préserver notre santé pendant notre séjour prolongé en apesanteur.  Le soir venu, nous avons eu une réunion d'équipe pour " +
          "discuter des prochaines étapes de notre mission d'exploration spatiale. Nous avons échangé des idées sur ___________ et ___________, " +
          "des aspects cruciaux de notre projet.  Après la réunion, nous nous sommes retirés dans nos quartiers pour nous reposer et nous préparer " +
          "pour une nouvelle journée d'exploration spatiale excitante le lendemain."
    },
    startTimer(){
      setInterval(() => {
        if(this.timer > 0){
          this.timer -= 1
        }
        if (this.timer == 0){
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
  width: 50%;
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