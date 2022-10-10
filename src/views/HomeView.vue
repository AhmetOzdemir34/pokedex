<template>
  <div class="home">
    <div class="container">
      <HomeHeader />
      <HomePokemons/>
    </div>
  </div>
</template>

<script lang="ts">
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
  
  created(){    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
       if (!user) {
        this.$router.push({name:'login'}) 
      }
    });
  }
}
</script>

<style scoped>
   
</style>
