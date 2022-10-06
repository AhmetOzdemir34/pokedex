<template>
  <div class="home">
    <div class="container">
      <HomeHeader />
      <HomePokemons/>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { Component, Vue } from 'vue-property-decorator';
import HomeHeader from "../components/HomeHeader.vue";
import HomePokemons from "../components/HomePokemons.vue";

@Component({
  components : {
    HomeHeader,
    HomePokemons
  },
})
export default class HomeView extends Vue {
  
  

  auth = getAuth();
  created(){    
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.$router.push({name:'login'}) 
      }
    });
  }
}
</script>

<style scoped>
   
</style>
