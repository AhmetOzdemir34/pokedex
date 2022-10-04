<template>
    <div class="back">
        <div class="text-center">
            <p style="font-size: 36px;">{{pokemon.height}}</p>
            <p style="font-size:18px;">HEIGHT</p>
        </div>
        <div class="text-center">
            <p style="font-size: 36px;">{{pokemon.weight}}</p>
            <p style="font-size:18px;">WEIGHT</p>
        </div>
        <div style="width:100%; height:100%; padding-top:1.5rem;">
            <div class="dropdown">
                <button class="btn">Details</button>
                <div class="dropdown-content">
                    <div @click="oModal(pokemon)">with Modal</div>
                    <div @click="oNav(pokemon)">with Drawer</div>
                    <router-link :to="getUrl(pokemon.name)">with Page</router-link>
                </div>
            </div>
            <button v-if="pokemon.favourite" class="btn icon i-like fa-solid fa-thumbs-down"></button>
            <button v-else class="btn fa-solid fa-thumbs-up icon i-dislike"></button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Pokemons } from '@/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop()
        pokemon !: Pokemons;
        @Prop()
        drawerPokemon !: Pokemons;
        @Prop()
        modalPokemon !: Pokemons;
        
        getUrl(name:string): string{
            return `pokemon/${name}`
        }
        oModal(data:Pokemons) {
            this.$emit('oModal', data);
        }
        oNav(data:Pokemons) {
            this.$emit('oNav', data);
        }
    }
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-content>div:nth-last-of-type(2){
    margin: 2px 0;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content>div{
    cursor: pointer;
}
.back{
    margin: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: #fafafa;
    color: #333;
    transform: rotateY(180deg);
    border-radius: 5px;
}
.i-like{
    background: rgb(255, 137, 116);
    color: white;
}
.i-dislike{
    background: rgb(116, 116, 255);
    color: white;
}
.btn{
    width: 100%;
    padding: 6px;
    margin: 2px 0;
    border: 0;
    cursor: pointer;
    transition: .5s all ease;
}
.icon{
    font-size: 22px;
}
.btn:hover{
    background-color: rgb(75, 75, 75);
    color: white;
}
</style>