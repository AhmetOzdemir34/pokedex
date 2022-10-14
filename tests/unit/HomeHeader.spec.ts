import { createLocalVue, shallowMount } from "@vue/test-utils";
import HomeHeader from "../../src/components/HomeHeader.vue";
import {i18n} from "../../src/locales/index";
import Vuex, { Store } from "vuex";

const localVue = createLocalVue()
localVue.use(Vuex)

describe("HomeHeader.vue", ()=>{
    
    var state:any;
    var store:any;
    var mutations:any;
    beforeEach(() => {
        state = {
          pokemons: [] = [
            {
                id:1,
                name:"bulbasaur",
                height: 7,
                weight: 69
            },
            {
                id:2,
                name:"ivysaur",
                height: 10,
                weight: 130
            }
        ],
        },
        mutations = {
            nameASC(){
                return state.pokemons.sort((a:any,b:any) => a.name.localeCompare(b.name));
            },
            nameDESC(){
                return state.pokemons.sort((a:any,b:any) => b.name.localeCompare(a.name));
            }
        }
        store = new Vuex.Store({
          state,
          mutations
        })
    })

    it("should mount vuex & a page", ()=>{
        const wrapper = shallowMount(HomeHeader,{
            i18n,
            localVue,
            store
        });

        expect(wrapper.exists()).toBe(true);
    })
});