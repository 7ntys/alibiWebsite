<template>
  <div class="component">
    <h2 class="question">{{item.questions}}</h2>
    <div class="answer">
      <div class="profile">
        <img src="../assets/profilePicture/picture1.png">
        <p class="username">{{item.firstPlayer}}</p>
      </div>
      <div class="profile">
        <img src="../assets/profilePicture/picture2.png">
        <p class="username">{{ item.secondPlayer }}</p>
      </div>
      <p class="answer0">{{item.answers0}}</p>
      <p class="answer1">{{item.answers1}}</p>
    </div>
    <div>
      <button v-if="item.vote === 0 || item.vote === 3" @click="vote(0,item)"
              :class="[item.vote === 0 ? 'dislikedAnim' : 'disliked']"><img src="../assets/Cross.png"></button>
      <button v-if="item.vote === 1 || item.vote === 3" @click="vote(1,item)"
              :class="[item.vote === 1 ? 'likedAnim' : 'liked']"><img src="../assets/Check.png"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComparaisonCard',
  props: ["item"],
  methods:{
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
  }
}
</script>
<style scoped>
.component {
  background-color: #2c3e50;
  color: white;
  width: 50%;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: black 0 0 10px;
}

.question {
  font-weight: bold;
  border-bottom: grey 1px solid;
  padding: 10px;
}

.answer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
  margin: 0 auto;
  width: 100%;
  border-bottom: grey solid 1px;
}

.username {
  margin: 0 auto;
  padding: 0px;
  font-weight: bold;
}

.profile {
  border-bottom: grey solid 1px;
  padding: 10px 0;
}

.answer img {
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

button img {
  margin: 0 auto;
  padding-top: 10px;
}
.disliked{
  color: red;
  transition: 0.2s;
}
.liked{
  color: green;
  transition: 0.2s;
}
.disliked:hover{
  color: black;
  background: rgba(255,0,0,0.3);
  transform: scale(1.2);
  transition: 0.1s;
}
.liked:hover{
  color: black;
  background: rgba(0,255,0,0.3);
  transform: scale(1.2);
  transition: 0.1s;
}
button img {
  margin: 0 auto;
  padding-top: 10px;
}
.likedAnim{
  background: rgba(0,255,0,0.3);
}
.dislikedAnim{
  background: rgba(255,0,0,0.3);
}
@media only screen and (max-width: 600px) {
  .component{
    width: 90%;
  }
  .profile img{
    width: 50%;
  }
}
</style>