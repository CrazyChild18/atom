<template>
  <router-view />
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.loginMusic();
  },
  methods:{
    loginMusic: function (){
      axios.get("http://localhost:3000/login/cellphone?phone=13910831098&password=liyunkai720")
					.then(
						function(res) {
              console.log("Log in successful")
						},
						function(err) {
              console.log("Log in failed")
            });
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }
</style>
