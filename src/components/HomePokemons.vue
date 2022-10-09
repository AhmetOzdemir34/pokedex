<template>
    <div>
        <div v-if="getFiltered.length>0" class="flex flex-row flex-wrap items-center">
            <div v-for="pokemon,i in getFiltered" :key="i" class="pokemon-card">
                <div class="relative">
                    <div class="card">
                        <FrontCard :pokemon="pokemon"/>
                        <BackCard  :pokemon="pokemon" :drawerPokemon="drawerPokemon" 
                        :modalPokemon="modalPokemon" 
                        @oModal="openModal($event)" @oNav="openNav($event)"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
        <div v-if="getPokemons.length>0 && getResults.length===0" class="flex flex-row flex-wrap items-center">
            <div v-for="pokemon,i in getPokemons" :key="i" class="pokemon-card">
                <div class="relative">
                    <div class="card">
                        <FrontCard :pokemon="pokemon"/>
                        <BackCard  :pokemon="pokemon" :drawerPokemon="drawerPokemon" 
                        :modalPokemon="modalPokemon" 
                        @oModal="openModal($event)" @oNav="openNav($event)"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="getSpecies.length>0">
                <h2 class="text-center">{{$t("homePokemons.speciesResults")}}</h2>
                <div class="flex flex-row flex-wrap items-center">
                    <div v-for="pokemon,i in getSpecies" :key="i" class="pokemon-card">
                        <div class="relative">
                            <div class="card">
                                <FrontCard :pokemon="pokemon"/>
                                <BackCard  :pokemon="pokemon" :drawerPokemon="drawerPokemon" 
                                :modalPokemon="modalPokemon" 
                                @oModal="openModal($event)" @oNav="openNav($event)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="getMoves.length>0">
                <h2 class="text-center">{{$t("homePokemons.movesResults")}}</h2>
                <div class="flex flex-row flex-wrap items-center">
                    <div v-for="pokemon,i in getMoves" :key="i" class="pokemon-card">
                        <div class="relative">
                            <div class="card">
                                <FrontCard :pokemon="pokemon"/>
                                <BackCard  :pokemon="pokemon" :drawerPokemon="drawerPokemon" 
                                :modalPokemon="modalPokemon" 
                                @oModal="openModal($event)" @oNav="openNav($event)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="getResults.length>0">
                <h2 class="text-center">{{$t("homePokemons.pokemonResults")}}</h2>
                <div class="flex flex-row flex-wrap items-center">
                    <div v-for="pokemon,i in getResults" :key="i" class="pokemon-card">
                        <div class="relative">
                            <div class="card">
                                <FrontCard :pokemon="pokemon"/>
                                <BackCard  :pokemon="pokemon" :drawerPokemon="drawerPokemon" 
                                :modalPokemon="modalPokemon" 
                                @oModal="openModal($event)" @oNav="openNav($event)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <HomeDrawer :drawerPokemon="drawerPokemon"/>
        <HomeModal :modalPokemon="modalPokemon"
        @previousX="previous($event)" @nextX="next($event)"
        />
    
    </div>
    
</template>

<script lang="ts">
    import { mainStore } from '@/store/main.module';
    import { Pokemons } from '@/types';
    import axios from 'axios';
    import { Component, Vue } from 'vue-property-decorator';
    import HomeDrawer from './HomeDrawer.vue';
    import HomeModal from './HomeModal.vue';
    import FrontCard from './FrontCard.vue';
    import BackCard from './BackCard.vue';
    
    @Component({
        components:{
            HomeDrawer,
            HomeModal,
            FrontCard,
            BackCard
        }
    })
    export default class  extends Vue {
        modalPokemon = {} as Pokemons;
        drawerPokemon = {} as Pokemons;

        async created(){
            if(mainStore.getPokemons.length===0){
                try{
                    for(let i=1;i<=500;i++){
                        const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/'+i);
                        mainStore.addPokemons({
                            id:data.id,
                            name: data.name,
                            height: data.height,
                            weight: data.weight,
                            base_experience: data.base_experience,
                            imageUrl:data.sprites.other.dream_world.front_default,
                            moves: data.moves,
                            species: {name: data.species.name}
                        });
                    }
                }catch(err: any){
                    alert(`Hata Tanımı: ${err.message}\nLütfen sayfayı yenileyiniz.`);
                }
            }
        }
        get getResults() :Pokemons[]{            
            return mainStore.getResults;
        }
        get getFiltered() :Pokemons[]{
            return mainStore.getFiltered;
        }
        get getSpecies() : Pokemons[]{
            return mainStore.getSpecies;
        }
        get getMoves() : Pokemons[]{
            return mainStore.getMoves;
        }
        get getPokemons() :Pokemons[]{
            return mainStore.getPokemons;
        }
        get getMode(){
            return mainStore.getMode;
        }
        openModal(data:Pokemons) {
            this.modalPokemon = data;
            var value = document.getElementById("myModal") as HTMLElement; 
            value.style.display= 'block'; 
        }
        openNav(data:Pokemons) {
            this.drawerPokemon = data;
            var value = document.getElementById("mySidenav") as HTMLElement; 
            value.style.width = "270px";
        }
        previous(id:number){
            if(id>1){
                this.modalPokemon = mainStore.getPokemons.find(pokemon => pokemon.id === (id-1)) as Pokemons;
            } 
        }
        next(id:number){
            this.modalPokemon = mainStore.getPokemons.find(pokemon => pokemon.id === (id+1)) as Pokemons; 
        }
    }
</script>

<style scoped>
.pokemon-card{
    text-align: center;
    width: 25%;
    padding: 1rem;
    border-radius: 4px;
    height: 300px;
}
.card{
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all .3s ease-in-out;
}
.card:hover{
    transform: rotateY(180deg);
}
@media(max-width:900px){
    .pokemon-card{
        width: 33%;
    }
}
@media(max-width:700px){
    .pokemon-card{
        width: 50%;
    }
}
@media(max-width:500px){
    .pokemon-card{
        width: 100%;
    }
}
</style>