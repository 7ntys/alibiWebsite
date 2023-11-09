<template>
  <div class="container">
    <question-component v-if="index < 5" v-on:answerSubmitted="receiveAnswer($event)" :text="questionsArray[index]"></question-component>
  </div>
</template>

<script>
import QuestionComponent from "@/components/QuestionComponent.vue";
export default {
  name: "QuestionsComponent",
  props: ["questions"],
  components: {
    QuestionComponent
  },
  data() {
    return {
      answers: [],
      index: 0,
      questionsArray: ["What was the name of your friend", "Where was the hidden treasure", "How did you manage to escape the jail","" +
      "How did you steal the necklace","What was the famous dish of the restaurant"]
    }
  },
  methods: {
    receiveAnswer(event) {
      console.log("Answer received : " + event)
      console.log("index : "+this.index)
      this.answers+=event
      if (this.index < this.questionsArray.length - 1) {
        this.index += 1
      } else {
        //TODO : Send the answers to the database and go to comparaison View
        this.$router.push({name:'ComparaisonView'})
      }
    }
  }
}
</script>

<style scoped>

</style>