<template>
  <RouterLink to="/"></RouterLink>
  <RouterLink to="/Lobby"></RouterLink>
  <RouterLink to="/Alibi"></RouterLink>
  <RouterLink to="/questions"></RouterLink>
  <RouterLink to="/comparaison"></RouterLink>
  <RouterView></RouterView>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
body{
  background-color: #371d10;
}
</style>
