import { shallowMount,mount } from "@vue/test-utils";
import HomeDrawer from "../../src/components/HomeDrawer.vue";
import {i18n} from "../../src/locales/index";


describe("HomeDrawer.vue", ()=>{
    
    it("should mount a page", ()=>{
        const wrapper = shallowMount(HomeDrawer,{
            i18n,
            propsData: {
                drawerPokemon : {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            }
        });        
        expect(wrapper.find("#mySidenav").exists()).toBe(true);
    });
    it("getUrl methods should works", ()=>{
        const wrapper = shallowMount(HomeDrawer,{
            i18n,
            propsData: {
                drawerPokemon : {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            }
        });        
        expect(wrapper.find('[data-test="router-link"]').attributes().to).toBe("pokemon/bulbasaur");
    });
});