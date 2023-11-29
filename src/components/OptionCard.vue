<template>
  <div class="container">
    <div class="checkbox">
      <label class="checkbox-wrapper">
        <input :value="value" @click="toggleCheck" type="checkbox" class="checkbox-input" :checked="value"/>
        <span class="checkbox-tile">
				<span class="checkbox-icon">
					<img :src="gameImage">
        </span>
				<span class="checkbox-label">{{gameName}}</span>
			</span>
      </label>
    </div>
  </div>
</template>

<script>
import {updateGameSettings,getFromSessionStorage} from "../crude.js";
export default {
  name: "OptionCard",
  props:["gameName","gameImage","checked"],
  data(){
    return{
      value : this.checked
    }
  },
  computed:{
    isChecked:function (){
      if(this.value){return "checked"}
      else{return ""}
    }
  },
  mounted(){
    this.gameCode = getFromSessionStorage("game_id");
    },
  updated() {
    this.value = this.checked
  },
  methods:{
    async toggleCheck(){
      this.value = !this.value
      this.$emit('voted',this.value)
      console.log("This.checked :",this.value);
      console.log("This.name :",this.value);
      console.log("This code ",this.value);

      if(this.gameName === "Ink Splash"){
        console.log("Ink Splash");
        await updateGameSettings(this.gameCode, [null,null,this.value,null,null,null]);
      }
      else if(this.gameName == "Tsunami"){
        console.log("Tsunami")
        await updateGameSettings(this.gameCode, [null,null,null,null,this.value,null]);
      }
      else if(this.gameName == "Vanish"){
        console.log("Vanish")
        await updateGameSettings(this.gameCode, [null,null,null,this.value,null,null]);
      }
      else if(this.gameName == "Fire"){
        console.log("Fire");
        await updateGameSettings(this.gameCode, [null,this.value,null,null,null,null]);
      }
      else{
        console.log("Error");
    }
  }
}
}
</script>

<style scoped>
/* Importation de la police Inter depuis Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

/* Réinitialisation du box-sizing */
*,
*:after,
*:before {
  box-sizing: border-box;
}
.container{
  max-width: 100%;
}

img{
  max-width: 90%;
}

/* Styles du groupe de checkbox */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  user-select: none;
}

/* Styles de la légende du groupe de checkbox */
.checkbox-group-legend {
  font-size: 1.5rem;
  font-weight: 700;
  color: #9c9c9c;
  text-align: center;
  line-height: 1.125;
  margin-bottom: 1.25rem;
}

/* Styles de l'input checkbox */
.checkbox-input {
  /* Code pour cacher l'input */
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/* Styles de la checkbox lorsqu'elle est cochée */
.checkbox-input:checked + .checkbox-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #2260ff;
}

/* Styles de la checkbox lorsqu'elle est cochée, avant */
.checkbox-input:checked + .checkbox-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: #2260ff;
  border-color: #2260ff;
}

/* Styles de l'icône et de l'étiquette de la checkbox lorsqu'elle est cochée */
.checkbox-input:checked + .checkbox-tile .checkbox-icon,
.checkbox-input:checked + .checkbox-tile .checkbox-label {
  color: #2260ff;
}

/* Styles de la checkbox lorsqu'elle est en focus */
.checkbox-input:focus + .checkbox-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

/* Styles de la checkbox lorsqu'elle est en focus, avant */
.checkbox-input:focus + .checkbox-tile:before {
  transform: scale(1);
  opacity: 1;
}

/* Styles de la checkbox lorsqu'elle est désactivée */
.checkbox-input:disabled + .checkbox-tile {
  opacity: 0.85;
}

/* Styles de l'icône et de l'étiquette de la checkbox lorsqu'elle est désactivée */
.checkbox-input:disabled + .checkbox-tile .checkbox-icon,
.checkbox-input:disabled + .checkbox-tile .checkbox-label {
  color: #9a9a88;
}

/* Styles de la checkbox-tile */
.checkbox-tile {
  margin-top: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

/* Styles de l'élément before de la checkbox-tile */
.checkbox-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

/* Styles de la checkbox-tile lorsqu'elle est survolée */
.checkbox-tile:hover {
  border-color: #2260ff;
}

/* Styles de l'icône de la checkbox */
.checkbox-icon {
  transition: 0.375s ease;
  color: #494949;
}

/* Styles de l'étiquette de la checkbox */
.checkbox-label {
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
}

</style>