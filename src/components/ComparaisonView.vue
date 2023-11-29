<template>
  <div class="container">
    <div class="wrapper" v-if="turn === 0">
      <ComparaisonCard @voteSubmitted="(value) => this.team1.vote[index-1] = value" v-for="index in 5" :key="index" :player0="team1.firstPlayer" :player1="team1.secondPlayer" :answers0="team1.answers0[index-1]" :answers1="team1.answers1[index-1]" :question="team1.questions[index-1]" :vote="team1.vote[index-1]"/>
    </div>
    <div class="wrapper" v-else>
      <ComparaisonCard @voteSubmitted="(value) => this.team2.vote[index-1] = value" v-for="index in 5" :key="index" :player0="team2.firstPlayer" :player1="team2.secondPlayer" :answers0="team2.answers0[index-1]" :answers1="team2.answers1[index-1]" :question="team2.questions[index-1]" :vote="team2.vote[index-1]"/>
    </div>
    <button class="submit" @click="submit()">
      Done
    </button>
  </div>
</template>

<script>
import ComparaisonCard from "@/components/ComparaisonCard.vue";

import { getPlayerIDList, getTeamList, getFromSessionStorage} from "@/crude";
import io from 'socket.io-client';

export default {
  name:"ComparaisonView",
  components: {ComparaisonCard},
  async mounted() {
  console.log("THIS IS THE COMPARAISON VIEW");

  const playerIdList = await getPlayerIDList(getFromSessionStorage("game_id"));
  console.log("playerIdList",playerIdList);
  const teamList =  await getTeamList(getFromSessionStorage("game_id"));
  console.log("teamList de merde",teamList);
 
  let all_info = {};

  for (let i = 0; i < playerIdList.length; i++) {
      const playerInfo = {
          name: playerIdList[i].pseudo,
          pictureIndex: playerIdList[i].picture_index,
          team: teamList[i],
          id: playerIdList[i].playerId,
          answers: []
      };
      
    all_info[`player${i + 1}`] = playerInfo;
    if(playerInfo.team === 1){
      if(this.team1.firstPlayer == null){this.team1.firstPlayer = playerInfo}
      else{this.team1.secondPlayer = playerInfo}
    }
    else{
      if(this.team2.firstPlayer == null){this.team2.firstPlayer = playerInfo}
      else{this.team2.secondPlayer = playerInfo}
    }
  }


  console.log("all_info",all_info);
  const socket = io('http://localhost:4002', { transports: ['websocket'], debug: true });
  socket.connect();
  socket.emit('playersAnswers', (getFromSessionStorage("game_id")));
  socket.on('playersAnswers', ({ answer }) => {
  console.log("Nouvelle valeur de answer en temps réel : ", answer);
    answer.forEach((data,index) => {
      console.log("data",data);
      console.log("index",index)
      let player = all_info[`player${index + 1}`];
      if(player.team === 1){
        if(this.team1.answers0.length === 0){
          for(let i=0;i<5;i++){
            this.team1.answers0.push(data[i])
          }
        }
        else{
          for(let i=0;i<5;i++){
            this.team1.answers1.push(data[i])
          }
        }
      }
      else {
        if (this.team2.answers0 === 0) {
          for(let i=0;i<5;i++){
            this.team2.answers0.push(data[i])
          }
        } else {
          for(let i=0;i<5;i++){
            this.team2.answers1.push(data[i])
          }
        }
      }
    });
    
  });

    //TODO : Retrieve all answers and add a listener on it
  },
  data(){
    return {
      turn: 0,
      team1: {firstPlayer: null, secondPlayer: null, answers0: [], answers1: [], questions: [], vote: [0,0,0,0,0]},
      team2: {firstPlayer: null, secondPlayer: null, answers0: [], answers1: [], questions: [], vote: [0,0,0,0,0]},
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
.container{
  margin-top: 60px;
}
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