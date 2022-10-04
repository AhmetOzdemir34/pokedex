<template>
    <div id="myModal" class="text-center">
        <img :src="modalPokemon.imageUrl" :alt="modalPokemon.name" class="pokemon-image">
        <h2>{{modalPokemon.name}} #{{modalPokemon.id}}</h2>
        <div class="flex flex-row flex-nowrap justify-beetween items-center">
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.base_experience}}</p>
                <p>XP</p>
            </div>
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.height}}</p>
                <p>Height</p>
            </div>
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.weight}}</p>
                <p>Weight</p>
            </div>
        </div>
        <div class="text-center">
            <button @click="previousEmit(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-left"></button>
            <button @click="nextEmit(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-right"></button>
        </div>
        <div @click="closeModal" class="pointer">
            Close
        </div>
    </div>
</template>

<script lang="ts">
    import { Pokemons } from '@/types';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop()
        modalPokemon!: Pokemons

        closeModal() {
            var value = document.getElementById("myModal") as HTMLElement; 
            value.style.display = "none";
        }
        previousEmit(id:number){
            this.$emit("previousX",id);
        }
        nextEmit(id:number){
            this.$emit("nextX",id);
        }
    }
</script>

<style scoped>
.btn-modal{
    font-size: 30px;
    margin: 1rem .5rem;
    border: 0;
    padding: .2rem .8rem;
    cursor: pointer;
    border-radius: 10px;
}
#myModal{
    display: none;
    padding: 2rem;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    border-radius: 1rem;
    width: 30%;
    box-shadow: 0 0 20px 10px #f3f4f4;
}
.pokemon-image{
    width: 90%;
    display: block;
    margin: 0 auto;
    height: 200px;
    padding: 10px;
    object-fit: contain;
}
@media(max-width:900px){
    #myModal{
        width: 50%;
        top: 10%;
    }
}
@media(max-width:700px){
    #myModal{
        width: 60%;
    }
}
@media(max-width:500px){
    #myModal{
        width: 90%;
    }
}
</style>