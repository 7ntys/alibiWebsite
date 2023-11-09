<template>
  <div class="container">
    <img src="../assets/logo.png">
    <h1>Alibi</h1>
    <progress-bar-component></progress-bar-component>
  </div>
</template>

<script>
import ProgressBarComponent from "@/components/ProgressBar.vue";

export default {
  name: "PodiumComponent",
  components: {
    ProgressBarComponent
  },
  data() {
    return {
    }
  },
  methods: {
  }
}

</script>

<style scoped>
*{
  margin: 0 auto;
  padding: 0;
}
img{
  width: 15%;
}
h1{
  color: white;
  font-weight: bolder;
  font-size: 50px;
}
</style>