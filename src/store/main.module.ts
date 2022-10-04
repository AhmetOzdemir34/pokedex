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

    get getPokemons() : Pokemons[]{
        return this.pokemons;
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