<template>
    <div id="mySidenav" class="sidenav text-center" :class="[getMode?'lightModeLocal':'darkModeLocal']">
        <div class="flex flex-col flex-nowrap justify-center items-center h-full">
            <img :src="drawerPokemon.imageUrl" :alt="drawerPokemon.name" style="width:100%; height:200px;">
            <h2>{{drawerPokemon.name}}</h2>
            <h3>ID NUMBER: {{drawerPokemon.id}}</h3>
            <div class="mt-2rem">
                <div style="margin-top:1rem;">
                    <p style="font-size: 48px;">{{drawerPokemon.base_experience}}</p>
                    <p>Base Experience</p>
                </div>
            </div>
            <p class="mt-2rem" style="padding:0 10px">
                <router-link style="color:white; font-size: 20px;" :to="getUrl(drawerPokemon.name)">Click to reach a page</router-link> 
                that include more details about the pokemon.
            </p>
            <div @click="closeNav" class="pointer mt-2 underline">
                Close
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { mainStore } from '@/store/main.module';
import { Pokemons } from '@/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        @Prop()
        drawerPokemon!: Pokemons
        
        get getMode():boolean{
            return mainStore.lightMode;
        }
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
.lightModeLocal{
    background-color: rgb(20, 20, 20) !important;
    color: #f3f3f3 !important;
}
.darkModeLocal{
    background-color: rgba(131, 163, 26, 0.953) !important;
    color: #000 !important;
}
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