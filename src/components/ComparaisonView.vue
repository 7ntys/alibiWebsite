<template>
  <div class="container">
    <div class="wrapper" v-if="turn === 0">
      <ComparaisonCard v-for="item in team1" :key="item" :item="item"/>
    </div>
    <div class="wrapper" v-else>
      <ComparaisonCard v-for="item in team2" :key="item" :item="item"/>
    </div>
    <button class="submit" @click="submit()">
      Done
    </button>
  </div>
</template>

<script>
import ComparaisonCard from "@/components/ComparaisonCard.vue";

export default {
  name:"ComparaisonView",
  components: {ComparaisonCard},
  mounted() {
    //TODO : Retrieve all answers and add a listener on it
  },
  data(){
    return{
      turn : 0,
      team1 : [
          { questions : "What was the name of your friend",answers0: "John",answers1: "Demacia",vote:3,firstPlayer:"Julien",secondPlayer:"Mathieu"},
          { questions : "Where was the hidden treasure",answers0: "Paris",answers1: "Paris",vote:3,firstPlayer:"Julien",secondPlayer:"Mathieu"},
          { questions : "How did you manage to escape the jail",answers0: "by the window",answers1: "using the window",vote:3,firstPlayer:"Julien",secondPlayer:"Mathieu"}],
      team2 : [
          { questions : "Where did you go",answers0: "The Bar",answers1: "To the bar",vote:3,firstPlayer:"Damien",secondPlayer:"Vianney"},
          { questions : "Where was the hidden treasure",answers0: "Paris",answers1: "Paris",vote:3,firstPlayer:"Damien",secondPlayer:"Vianney"},
          { questions : "How did you manage to escape the jail",answers0: "by the window",answers1: "using the window",vote:3,firstPlayer:"Damien",secondPlayer:"Vianney"}],
    }
  },
  methods:{
    retrieveAnswers(){
      //TODO : Retrieve all answers
    },
    vote(value,question){
      if (value === question.vote) {
        console.log("reset")
        question.vote = 3
      }
      else {
        question.vote = value
        console.log(question)
      }
    },
    submit(){
      //TODO : Verify that all questions have been rated, then go send the result to the database and go to the next view
      if (this.turn === 0){
        this.turn++
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else{
        this.$router.push({name:'Podium'})
      }
    }
  }
}
</script>

<style scoped>
.answer img{
  margin: 0 auto;
  width: 20%;
}
button {
  background: #233140;
  border: none;
  font-size: 40px;
  box-shadow: black 0 0 5px;
  margin: 15px 10px 20px 10px;
  padding: 0px 10px;
  border-radius: 20px;
  cursor: pointer;
}
.submit{
  width: 40%;
  height: 150px;
  background: #0b670b;
  color: white;
  box-shadow: black 0 0 10px;
  margin: 40px auto;
  font-weight: bold;
  font-size: 45px;
  transition: 0.2s;
}
.submit:hover{
  transform: scale(1.1);
  transition: 0.2s;
}
@media only screen and (max-width: 600px) {
  .submit{
    width: 60%;
  }
}
</style>