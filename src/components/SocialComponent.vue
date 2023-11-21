<template>
  <div class="socialNetwork">
    <div v-for="social in socialNetwork" :key="social.name" class="social">
      <img :src="social.logo" class="socialNetworkLogo">
      <a :href="social.link" target="_blank">{{social.name}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SocialComponent',
  data(){
    return{
      socialNetwork: [
        {
          name: "Instagram",
          logo: require("../assets/instagram Logo.png"),
          link: "https://www.instagram.com/_julienlb_/"
        },
        {
          name: "Tiktok",
          logo: require("../assets/tiktok Logo.png"),
          link: "https://www.tiktok.com/@alibi.game",
        }
      ]
    }
  }
}
</script>
<style scoped>
a {
  color: white;
  text-decoration: none;
}

H1 {
  color: white;
  font-weight: bold;
  text-align: center;
}

input[type="text"] {
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  margin-left: 30px;
  display: inline-block;
  position: relative;
  box-shadow: black 0 0 10px;
}

button {
  width: 40%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px;
  background: rgba(149, 62, 64, 1);
  color: white;
  font-weight: bold;
}

label {
  position: absolute;
  right: 17px;
  top: 65%;
  transform: translateY(-50%);
  color: white;
  font-weight: bold;
}

.socialNetworkLogo {
  width: 100%;
  margin: 0 auto;
}

/*make the dropdown menu appear at the right of the .container div :*/
.dropdown img, .dropdownSocial img {
  float: right;
  margin: 0;
  display: flex;
  width: 10%;
}

.dropdown h2, .dropdownSocial h2 {
  float: left;
  margin: 0;
  display: flex;
  width: 90%;
}

/* Add a smooth transition on the rules component showing when clicking on the dropdown menu : */

a:hover {
  text-decoration: underline;
}

button {
  display: inline-block;
  margin: 15px;
  box-shadow: black 0 0 10px;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  input[type="text"] {
    width: 80%;
  }

  button {
    width: 80%;
  }

  button {
    margin: 10px auto;
  }

  .input-container label {
    display: none;
  }
}

PageLoader {
  transition: 0.5s;
}

</style>