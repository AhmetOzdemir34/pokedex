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
    moves: Pokemons[] = [] // moves results
    species: Pokemons[] = []
    filtered: Pokemons[] = []

    get getPokemons() : Pokemons[]{
        return this.pokemons;   
    }
    get getFiltered() : Pokemons[]{
        return this.filtered;   
    }
    get getResults(): Pokemons[]{
        return this.results;
    }
    get getMoves(): Pokemons[]{
        return this.moves;
    }
    get getSpecies(): Pokemons[]{
        return this.species;
    }
    get getMode() : boolean {
        return this.lightMode;
    }
    @Mutation
    nameASC(){
        this.filtered = this.pokemons.sort((a,b) => a.name.localeCompare(b.name))
    }
    @Mutation
    nameDESC(){
        this.filtered = this.pokemons.sort((a,b) => b.name.localeCompare(a.name))
    }
    @Mutation
    heightASC(){
        this.filtered = this.pokemons.sort((a,b) => a.height-b.height)
    }
    @Mutation
    heightDESC(){
        this.filtered = this.pokemons.sort((a,b) => b.height-a.height)
    }
    @Mutation
    weightASC(){
        this.filtered = this.pokemons.sort((a,b) => a.weight-b.weight)
    }
    @Mutation
    weightDESC(){
        this.filtered = this.pokemons.sort((a,b) => b.weight-a.weight)
    }
    @Mutation
    reset(){
        this.filtered = [];
        this.species = [];
        this.moves = [];
        this.results = [];
        this.pokemons = this.pokemons.sort((a,b) => a.id - b.id);
    }

    @Mutation
    addPokemons(data:Pokemons){
        this.pokemons.push(data);
    }
    @Mutation
    addResults(data:Pokemons){
        this.pokemons.push(data);
    }
    @Mutation
    removePokemons( data:Pokemons){
        this.pokemons.filter((pokemon:Pokemons) => data.id!==pokemon.id);
    }
    @Mutation
    match(){
        for (let i = 0; i < this.pokemons.length; i++) {
            this.results[i] = this.pokemons[i];
        }
    }
    @Mutation
    toggleMode(){
        this.lightMode = !this.lightMode; 
    }
    @Mutation
    clearMoves(){
        this.moves = [];
    }
    @Mutation
    searching(data:string){
        this.filtered = [];
        if(!data){
            this.results = [];
            this.moves = [];
            this.species = [];
        }else{
            this.results = this.pokemons.filter(e => e.name.includes(data));
            this.pokemons.forEach(e => {
                e.moves.forEach(i => {
                    if(i.move.name.includes(data)){
                        if(this.moves.every(ex => ex.id != e.id)){
                            this.moves.push(e);
                        }
                    }
                });
            });
            this.species = this.pokemons.filter(e => e.species.name.includes(data));
        }        
    }
}

export const mainStore = getModule(PokemonModule);