<template>
  <div class="container">
    <h2>Your alibi</h2>
    <h4>Time left : <span>{{timer}}</span> seconds</h4>
    <p>{{alibi}}</p>
  </div>
</template>

<script>
export default {
  name: "AlibiComponent",
  props:["alibiIndex","timerPassed"],
  data(){
    return{
      alibi : "",
      timer : this.timerPassed,
    }
  },
  computed:{
  },
  mounted() {
    this.getAlibiFromIndex()
    this.startTimer()
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
    }
  }
}
</script>

<style scoped>
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
  .container{
    width: 100%;
  }
}
</style>