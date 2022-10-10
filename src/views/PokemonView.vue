<template>
    <div id="root">
        <h2 class="text-center" style="margin-top: 1rem;">{{pokemon.name}} #{{pokemon.id}}</h2>
    <div v-if="pokemon.id" id="pokemon-page">
        <div id="part1">
            <img :src="pokemon.Img1" :alt="pokemon.name" class="images" />
            <img :src="pokemon.Img2" :alt="pokemon.name" class="images" />
            <img :src="pokemon.Img3" :alt="pokemon.name" class="images" />
        </div>
        <div id="part2">
            <div>
                <p style="font-size: 48px;font-style: italic;">{{pokemon.height}}</p>
                <p style="font-weight:bolder;">{{$t("common.height")}}</p>
            </div>
            <div>
                <p style="font-size: 48px;font-style: italic;">{{pokemon.weight}}</p>
                <p style="font-weight:bolder;">{{$t("common.weight")}}</p>
            </div>
            <div>
                <p style="font-size: 48px;font-style: italic;">{{pokemon.base_experience}}</p>
                <p style="font-weight:bolder;">{{$t("common.xp")}}</p>
            </div>
        </div>
        <div id="part3">
            <h3 class="moves">{{$t("pokemonView.moves")}}</h3> <br>
            <div class="move" v-for="move,i in pokemon.moves" :key="i">
                {{move.move.name}}
            </div>
            <h3 style="margin-top:4rem;">{{$t("pokemonView.stats")}}</h3> <br>
            <table style="width:100%;">
                <tbody>
                    <tr v-for="stat,i in pokemon.stats" :key="i">
                        <td>{{stat.stat.name}}</td>
                        <td>{{stat.base_stat}}</td>
                        <td>{{stat.effort}}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
    </div>
</template>

<script lang="ts">
    import { PokemonDetail } from '@/types';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        pokemon = {} as PokemonDetail;

        async created(){
             const auth = getAuth();
            if(!auth.currentUser){
                this.$router.push({name:"login"})
            }
            try{
                const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/`+this.$route.params.name);
                this.pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    Img2: data.sprites.other["official-artwork"].front_default,
                    Img3: data.sprites.other.dream_world.front_default,
                    Img1: data.sprites.other.home.front_default,
                    base_experience: data.base_experience,
                    stats: data.stats,
                    moves: data.moves
            }}catch(err:any){
                alert(`Hata Tanımı: ${err.message}\nBöyle bir pokemon yok!`);
            }
        }
    }
</script>

<style scoped>
#root{
    max-width: 1080px;
    margin: 0 auto;
    padding: 2rem 0;
}
#part2, #part3{
    padding: 1rem;
}
.moves{
    background-color: cadetblue;
    border-radius: 4px;
    color: white;
    padding: .5rem 1rem;
    display: inline-block;
}
.move{
    display: inline-block;
    background-color: darkgray;
    border-radius: 3px;
    padding: .2rem .4rem;
    margin: .3rem .4rem;
    color: white;
}
#pokemon-page{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: .5fr 1fr 1fr;
    grid-template-areas: 
    "images basics basics"
    "images subs subs"
    "images subs subs"
    ;
}
@media(max-width:700px){
    #pokemon-page{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 3fr .5fr;
    grid-template-areas: 
    "images"
    "images"
    "basics"
    "subs"
    "subs"
    ;
}   
}
.images{
    width: 80%;
    margin: 0 auto;
    height: 200px;
    object-fit: contain;
}
#part1{
    grid-area: images;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: flex-end;
}
#part2{
    text-align: center;
    grid-area: basics;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
}
#part3{
    grid-area: subs;
}
</style>