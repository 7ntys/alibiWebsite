<template>
  <div class="containerCarousel">
    <Carousel @slide-end="(event) => this.$emit('changeProfilePictureIndex',event.currentSlideIndex)">
      <Slide v-for="item in pictures" :key="item">
        <img :src="item" alt="item">
      </Slide>
      <template #addons>
        <Navigation class="nav" />
        <Pagination class="pag" />
      </template>
    </Carousel>
  </div>
</template>

<script>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: "PictureCarousel",
  components: {Carousel, Slide, Pagination, Navigation},
  data(){
    return{
      pictures : [require("../assets/profilePicture/picture1.png"),require("../assets/profilePicture/picture2.png"),require("../assets/profilePicture/picture3.png"),require("../assets/profilePicture/picture4.png"),require("../assets/profilePicture/picture5.png"),require("../assets/profilePicture/picture6.png"),require("../assets/profilePicture/picture7.png"),require("../assets/profilePicture/picture8.png"),require("../assets/profilePicture/picture9.png"),require("../assets/profilePicture/picture10.png")],
      pictureChosen : 0,
    }
  },
  method:{
    updateSlideNumber(slideNumber) {
      console.log(slideNumber)
    },
  },
  computed:{

  }
}
</script>

<style scoped>

/* For this component, i want to have a Carousel of pictures stored inside the assets/profilePicture folder
 */
.containerCarousel {
  width: 100%;
  background: #2c3e50;
  color: white;
  border-radius: 20px 0 20px 20px;
  position: relative;
  display: inline-block;
  box-shadow: none;
}
/*Centre le carousel : */
.nav,ol.carousel__pagination{
  text-align: center;
  margin: 0 auto;
  padding: 0;
}
.pag,button.carousel__next nav,carousel__prev{
  color :red;
}
</style>