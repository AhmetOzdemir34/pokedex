<template>
    <div id="myModal" class="text-center" style="display: none;">
        <img :src="modalPokemon.imageUrl" :alt="modalPokemon.name" class="pokemon-image">
        <h2>{{modalPokemon.name}} #{{modalPokemon.id}}</h2>
        <div class="flex flex-row flex-nowrap justify-beetween items-center">
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.base_experience}}</p>
                <p>{{$t("common.xp")}}</p>
            </div>
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.height}}</p>
                <p>{{$t("common.height")}}</p>
            </div>
            <div class="w-33">
                <p style="font-size: 38px;">{{modalPokemon.weight}}</p>
                <p>{{$t("common.weight")}}</p>
            </div>
        </div>
        <div class="text-center">
            <button @click="previousEmit(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-left"></button>
            <button @click="nextEmit(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-right"></button>
        </div>
        <div @click="closeModal" data-test="closeBtn" class="pointer">
            {{$t("common.close")}}
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
            console.log("tıkladın");
            
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
    padding: 2rem;
    position: fixed;
    top: 15%;
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
        top: 20%;
        width: 80%;
    }
}
</style>