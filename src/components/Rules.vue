<template>
  <div class="container">
    <h3>Alibi is a 4 player game</h3>
    <p>Phase 1 : Lire l'alibi avec votre équipier et le completer<br><br>
      Phase 2 : Répondre aux questions posés sans vous concerter <br><br>
      Phase 3 : Revoir les réponses en groupe et determinez quel duo a été le meilleur !
    </p>
  </div>
</template>

<script>
export default {
  name: "RulesComponent"
}
</script>

<style scoped>

.container{
  border-radius: 20px;
  background: rgba(44,62,80,0.5);
}
p{
  padding: 0 5% 0 5%;
  font-weight: normal;
}

</style>