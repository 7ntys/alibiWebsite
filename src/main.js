import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Profile from "@/components/Profile";
import Lobby from "@/components/Lobby";
import Alibi from "@/components/Alibi";
import Questions from "@/components/Questions";
import ComparaisonView from "@/components/ComparaisonView";
import Podium from "@/components/Podium.vue";
//Use vue router to create routes :
const routes = [
    { path: '/:gameCode?', component: Profile,name:'Profile',props:true},
    { path: '/lobby/:gameCode', component: Lobby,name:'Lobby',props: true },
    {path: '/alibi/:timerPassed',component: Alibi,name:'Alibi',props:true},
    {path: '/questions',component: Questions,name:'Questions'},
    {path: '/comparaison',component: ComparaisonView,name:'ComparaisonView'},
    {path: '/podium',component:Podium,name:'Podium'},
    {path: '/:pathMatch(.*)*',name:'not-found',redirect:'/'}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(router).mount('#app')


  
