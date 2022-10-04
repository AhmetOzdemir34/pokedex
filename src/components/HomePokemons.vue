<template>
    <div>
    <div class="flex flex-row flex-wrap items-center">
        <div v-for="pokemon,i in getPokemons" :key="i" class="pokemon-card">
            <div class="relative">
                <div class="card">
                    <div class="front">
                        <h2 class="p-2">{{pokemon.name}}</h2>
                        <hr style="border-top:1px solid rgba(255,255,255,.1)" />
                        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image"/>
                    </div>
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
                                    <div @click="openModal(pokemon)">with Modal</div>
                                    <div @click="openNav(pokemon)">with Drawer</div>
                                    <router-link :to="getUrl(pokemon.name)">with Page</router-link>
                                </div>
                            </div>
                            <button v-if="pokemon.favourite" class="btn icon i-like fa-solid fa-thumbs-down"></button>
                            <button v-else class="btn fa-solid fa-thumbs-up icon i-dislike"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            <button @click="previous(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-left"></button>
            <button @click="next(modalPokemon.id)" class="btn-modal fa-solid fa-chevron-right"></button>
        </div>
        <div @click="closeModal" class="pointer">
            Close
        </div>
    </div>
    </div>
</template>

<script lang="ts">
    import { mainStore } from '@/store/main.module';
import { Pokemons } from '@/types';
    import axios from 'axios';
    import { Component, Vue } from 'vue-property-decorator';
    
    @Component
    export default class  extends Vue {
        drawerPokemon = {} as Pokemons;
        modalPokemon = {} as Pokemons;

        async created(){
            if(mainStore.getPokemons.length===0){                
                const storage: number[] = JSON.parse(localStorage.getItem('pokemons') as string) || [];
                
               const promiseList =  Array.from({length:500}).map((_,i) => 
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
                )

                const dataList = await Promise.all(promiseList);

                dataList.forEach(({data}) => {
                    mainStore.addPokemons({
                        id:data.id,
                        name: data.name,
                        height: data.height,
                        weight: data.weight,
                        base_experience: data.base_experience,
                        imageUrl:data.sprites.other.dream_world.front_default,
                        favourite: storage.some(e => e === data.id)
                    });
                })
            }
        }
        get getPokemons() :Pokemons[]{
            return mainStore.getPokemons;
        }
        get getMode(){
            return mainStore.getMode;
        }
        previous(id:number){
            this.modalPokemon = mainStore.getPokemons.find(pokemon => pokemon.id === (id-1)) as Pokemons; 
        }
        next(id:number){
            this.modalPokemon = mainStore.getPokemons.find(pokemon => pokemon.id === (id+1)) as Pokemons; 
        }
        getUrl(name:string): string{
            return `pokemon/${name}`
        }
        openNav(data:Pokemons) {
            this.drawerPokemon = data;
            document.getElementById("mySidenav").style.width = "270px";
        }
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }
        openModal(data:Pokemons) {
            this.modalPokemon = data;
            document.getElementById("myModal").style.display= 'block';
        }
        closeModal() {
            document.getElementById("myModal").style.display = "none";
        }
    }
</script>

<style scoped>
.template{
    border-radius: 5px;
    padding: .5rem;
    width: 50%;
    margin: 0 auto;
}
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
.pokemon-card{
    text-align: center;
    width: 25%;
    padding: 1rem;
    border-radius: 4px;
    height: 300px;
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
.card-border{
    border: 1px solid rgb(164, 164, 164);
}
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
.front{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: rgba(138, 138, 138, 0.7);
    border-radius: 5px;
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
.pokemon-image{
    width: 90%;
    display: block;
    margin: 0 auto;
    height: 200px;
    padding: 10px;
    object-fit: contain;
}
@media(max-width:900px){
    .pokemon-card{
        width: 33%;
    }
    #myModal{
        width: 50%;
        top: 10%;
    }
}
@media(max-width:700px){
    .pokemon-card{
        width: 50%;
    }
    #myModal{
        width: 60%;
    }
}
@media(max-width:500px){
    .pokemon-card{
        width: 100%;
    }
    #myModal{
        width: 90%;
    }
}
</style>