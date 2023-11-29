<template>
  <div class="container">
    <h1>Index : {{index}}</h1>
    <question-component v-if="index < 5" v-on:answerSubmitted="receiveAnswer($event)" :text="questionsArray[index]"></question-component>
  </div>
</template>

<script>
import QuestionComponent from "@/components/QuestionComponent.vue";
import {getFromSessionStorage, updatePlayerAnswers} from "../crude.js";
export default {
  name: "QuestionsComponent",
  props: ["questions"],
  components: {
    QuestionComponent
  },
  data() {
    return {
      answers: {},
      index: 0,
      questionsArray: [getFromSessionStorage("question1"), getFromSessionStorage("question2"), getFromSessionStorage("question3"),
      getFromSessionStorage("question4"),getFromSessionStorage("question5")]
    }
  },
  methods: {
    async receiveAnswer(event) {
      console.log("Answer received : " + event)
      console.log("index : "+this.index)
      this.answers[this.index.toString()] = event
      console.log(this.answers)
      if (this.index < this.questionsArray.length - 1) {
        this.index += 1
      } else {
        console.log("Trying to update with : "+this.answers);
        //const array = {"1":"réponse1","2":"réponse2","3":"réponse3","4":"réponse4","5":"réponse5"};
        await updatePlayerAnswers(getFromSessionStorage("game_id"),getFromSessionStorage("player_id"), this.answers);
        this.$router.push({name:'ComparaisonView'})
      }
    }
  }
}
</script>

<style scoped>
.container{
  margin-top: 60px;
}
</style>