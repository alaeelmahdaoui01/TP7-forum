<template>
  <NavBarUser v-if="islogged" :user="user"/>
  <router-view/>
</template>

<script>
import { isLogged, getUser, waitForAuthInit } from '@/Firebase/Authentification/getUser'; 
import NavBarUser from './components/NavBarUser.vue';

export default {
  name: 'App',
  components: { NavBarUser },
  data() {
    return {
      user: null,
      islogged: false,
    };
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.islogged = isLogged();
      if (this.islogged) {
        this.user = getUser();
      }
    });
  },
}
</script>

<style>
  body{
    font-family: Arial, sans-serif;
  }
</style>