<template>
  <div class="home">
    <div class="container">
      <HomeHeader />
      <HomePokemons/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeHeader from "../components/HomeHeader.vue";
import HomePokemons from "../components/HomePokemons.vue";

@Component({
  components : {
    HomeHeader,
    HomePokemons
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
   
</style>
