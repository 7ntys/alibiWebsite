<template>
  <div class="container">
    <H2>{{text}}</H2>
    <div class="inputContainer">
      <input  type="text" v-model="answer" placeholder="Your answer" maxlength="60">
    </div>
    <button v-on:click="submitAnswer()" v-on:mouseover="hoveringButton = true" @mouseleave="hoveringButton = false" :class="{hovering : hoveringButton}">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: "QuestionComponent",
  props:["text"],
  data(){
    return{
      answer : "",
      hoveringButton : false,
    }
  },
  methods:{
    submitAnswer(){
      //TODO : Send the answer to the database
      this.$emit('answerSubmitted',this.answer)
      this.answer = ""
    }
  }
}
</script>

<style scoped>
h2{
  color : white;
  padding: 20px 0 10px 0;
}
.container{
  background: #2c3e50;
  border-radius: 20px;
  width: 40%;
  margin: 20px auto;
  box-shadow: black 0 0 10px;
}
input[type="text"]{
  width: 70%;
  height: 50px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background: #233140;
  color: white;
  font-size: 20px;
  padding: 10px;
  margin: 10px;
}
button{
  width: 70%;
  height: 80px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background: #233140;
  color: white;
  font-size: 20px;
  padding: 10px;
  margin: 20px 40px 40px 40px;
  box-shadow: black 0 0 10px;
}
.hovering{
  background: #371d10;
  font-weight: bold;
  box-shadow: white 0 0 10px;
}
@media only screen and (max-width: 600px) {
  .container{
    width: 90%;
  }
}
</style>