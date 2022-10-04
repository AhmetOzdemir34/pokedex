<template>
    <div id="mySidenav" class="sidenav text-center">
        <div style="color: rgb(240,240,240);max-height: 70vh;">
            <img :src="drawerPokemon.imageUrl" :alt="drawerPokemon.name" style="width:100%; height:200px;">
            <h2>{{drawerPokemon.name}}</h2>
            <h3>ID NUMBER: {{drawerPokemon.id}}</h3>
            <p v-if="drawerPokemon.favourite" class="mt-2">In favs :)</p>
            <p v-else  class="mt-2">Not in favs :(</p>
            <div class="mt-2rem">
                <div style="margin-top:1rem;">
                    <p style="font-size: 48px;">{{drawerPokemon.base_experience}}</p>
                    <p>Base Experience</p>
                </div>
            </div>
            <p class="mt-2rem">
                <router-link style="color:white;" :to="getUrl(drawerPokemon.name)">Click to reach a page</router-link> 
                that include more details about the pokemon.
            </p>
            <div @click="closeNav" class="pointer mt-2 underline">
                Close
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Pokemons } from '@/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        @Prop()
        drawerPokemon!: Pokemons
        
        getUrl(name:string): string{
            return `pokemon/${name}`
        }
        closeNav() {
            var value = document.getElementById("mySidenav") as HTMLElement; 
            value.style.width = "0";
        }
    }
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(169, 169, 169);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 20px;
}
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
</style>