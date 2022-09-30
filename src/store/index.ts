import { FavsPokemon } from '@/types';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favs: [] as FavsPokemon[],
  },
  getters: {
  },
  mutations: {
    addFavs(state, data:FavsPokemon){
      state.favs.push(data);
    },
    removeFavs(state, data:FavsPokemon){
      state.favs.filter((pokemon:FavsPokemon) => data.id!==pokemon.id);
    }
  },
  actions: {
  },
  modules: {
  }
})
