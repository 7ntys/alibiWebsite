<template>
  <div class="container">
    <div class="component" v-for="item in team1" :key="item">
      <h2 class="question">{{item.questions}}</h2>
      <p class="answer0">{{item.answers0}}</p>
      <p class="answer1">{{item.answers1}}</p>
      <div v-if="item.voted == null">
        <button @click="vote(0)"><img src="../assets/Dislike.png"></button>
        <button @click="vote(1)"><img src="../assets/Like.png"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"ComparaisonView",
  mounted() {
    //TODO : Retrieve all answers and add a listener on it
  },
  data(){
    return{
      team1 : [
          { questions : "What was the name of your friend",answers0: "John",answers1: "Demacia"},
          { questions : "Where was the hidden treasure",answers0: "Paris",answers1: "Paris"},
          { questions : "How did you manage to escape the jail",answers0: "by the window",answers1: "using the window"}],
    }
  },
  methods:{
    retrieveAnswers(){
      //TODO : Retrieve all answers
    },
    vote(){

    }
  }
}
</script>

<style scoped>
.component{
  background-color : #2c3e50;
  color: white;
  width: 50%;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: black 0 0 10px;
}
.question{
  font-weight: bold;
  border-bottom: grey 1px solid;
  padding: 10px;
}
.answer0 , .answer1{
  padding-bottom: 20px;
  border-bottom: #371d10 1px solid;
}
</style>