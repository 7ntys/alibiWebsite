<template>
  <div class="container">
    <h2>{{text}}</h2>
    <div class="inputContainer">
      <input type="text" v-model="answer" placeholder="Your answer" maxlength="60">
    </div>
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
      timer:10
    }
  },
  methods:{
    submitAnswer(){
      //TODO : Send the answer to the database
      this.$emit('answerSubmitted',this.answer)
      this.answer = ""
    },
    startTimer(){
      setInterval(()=>{
        if(this.timer>0){
          this.timer-=1
        }
        if(this.timer == 0){
          this.submitAnswer()
          this.timer = 10
        }
      },1000)
    }
  },
  mounted() {
    this.startTimer()
  },
}
</script>

<style scoped>
body{
  overflow: hidden;
}
h1{
  color : white;
  padding: 0;
  margin: 0 auto;
  padding-top: 15px;
}
h2{
  color : white;
  padding: 20px 0 20px 0;
  margin: 0 auto;
}
.container{
  background: #2c3e50;
  box-shadow: black 0 0 10px;
  width: 50%;
  margin: 20px auto;
  resize: both;
  border:10px solid #232d3561;
  border-image :url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 20s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23EE4343D8' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1;}
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
  margin-bottom: 20px;
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
  font-weight: bold;
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