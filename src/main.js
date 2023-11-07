import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Profile from "@/components/Profile";
import Lobby from "@/components/Lobby";
import Alibi from "@/components/Alibi";
import Questions from "@/components/Questions";
import ComparaisonView from "@/components/ComparaisonView";
//Use vue router to create routes :
const routes = [
    { path: '/', component: Profile,name:'Profile' },
    { path: '/lobby', component: Lobby,name:'Lobby' },
    {path: '/alibi/:timerPassed',component: Alibi,name:'Alibi',props:true},
    {path: '/questions',component: Questions,name:'Questions'},
    {path: '/comparaison',component: ComparaisonView,name:'ComparaisonView'}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(router).mount('#app')
