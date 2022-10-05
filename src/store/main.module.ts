import { Module, VuexModule, Mutation , getModule } from 'vuex-module-decorators'
import { Pokemons } from "../types/index";
import { store } from "./index";

@Module({
    name: "main",
    dynamic: true,
    store,
    namespaced: true,
})
export default class PokemonModule extends VuexModule {
    pokemons: Pokemons[] = []
    lightMode = true as boolean
    results: Pokemons[] = [] //pokemon results
    results2: Pokemons[] = [] //moves results

    get getPokemons() : Pokemons[]{
        return this.pokemons;   
    }
    get getResults(){
        return this.results;
    }
    get getResults2(){
        return this.results2;
    }
    /* set setResults(data:any | boolean){
        if(!data){
            this.results = data;
        }
    } */
    get getMode() : boolean {
        return this.lightMode;
    }
    get nameASC() : Pokemons[] {
        return this.pokemons.sort((a,b) => a.name.localeCompare(b.name))
    }
    get heightASC() : Pokemons[] {
        return this.pokemons.sort((a,b) => a.height-b.height)
    }
    get weightDESC() : Pokemons[] {
        return this.pokemons.sort((a,b) => b.weight-a.weight)
    }
    get reset() : Pokemons[] {
        return this.pokemons.sort((a,b) => a.id-b.id)
    }

    @Mutation
    searching(data:string){
        this.results = this.pokemons.filter(e => e.name.includes(data));
        this.results2 = this.pokemons.filter(e => e.moves[0].move.name.includes(data));
    }

    @Mutation
    addPokemons(data:Pokemons){
        this.pokemons.push(data);
    }
    
    @Mutation
    removePokemons( data:Pokemons){
        this.pokemons.filter((pokemon:Pokemons) => data.id!==pokemon.id);
    }

    @Mutation
    toggleMode(){
        this.lightMode = !this.lightMode; 
    }
}

export const mainStore = getModule(PokemonModule);