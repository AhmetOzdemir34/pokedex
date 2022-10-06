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
    results: Pokemons[] |null = null //pokemon results
    results2: Pokemons[] |null = null //moves results
    
    get getPokemons() : Pokemons[]{
        return this.pokemons;   
    }
    get getPermission(){
        if(this.getResults && this.getResults2){
            return false;
        }
        return true
    }
    get getResults(){
        if(!mainStore.results || mainStore.results.length==0){
            return null;
        }
        return this.results;
    }
    get getResults2(){
        if(!mainStore.results2 || mainStore.results2.length==0){
            return null;
        }
        return this.results2;
    }
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