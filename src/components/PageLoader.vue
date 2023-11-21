<template>
  <div class="page-loader">
    <div class="cube" style="background-color: #2ecc71"></div>
    <div class="cube" style="background-color: #3498db"></div>
    <div class="cube" style="background-color: #e74c3c"></div>
    <div class="cube" style="background-color: #f1c40f"></div>
  </div>
</template>

<script>
export default {
  name: 'PageLoader',
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.page-loader{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: #371d10;
  z-index: 999;
}
.cube{
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
  margin-right: 10px;
  animation: cube 1.3s infinite ease-in-out;
  &:first-child{
    animation: left 1s infinite;
  }
  &:last-child{
    animation: right 1s infinite .5s;
  }
}
@keyframes left {
  40%{
    transform: translateX(-60px);
  }
  50%{
    transform: translateX(0);
  }
}
@keyframes right {
  40%{
    transform: translateX(60px);
  }
  50%{
    transform: translateX(0);
  }
}

</style>