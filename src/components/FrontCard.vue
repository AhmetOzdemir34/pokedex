<template>
    <div class="front">
        <h2 class="p-2">{{pokemon.name}}</h2>
        <hr style="border-top:1px solid rgba(255,255,255,.1)" />
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image"/>
    </div>
</template>

<script lang="ts">
    import { Pokemons } from '@/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        @Prop()
        pokemon !: Pokemons; 
    }
</script>

<style scoped>
.pokemon-image{
    width: 90%;
    display: block;
    margin: 0 auto;
    height: 200px;
    padding: 10px;
    object-fit: contain;
}
.front{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: rgba(138, 138, 138, 0.7);
    border-radius: 5px;
}
</style>