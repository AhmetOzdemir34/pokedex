import { shallowMount } from "@vue/test-utils";
import FrontCard from "../../src/components/FrontCard.vue";
import {i18n} from "../../src/locales/index";


describe("FrontCard.vue", ()=>{
    
    it("should mount a page", ()=>{
        const wrapper = shallowMount(FrontCard,{
            i18n,
            propsData: {
                pokemon: {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            } 
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("should show a features of pokemon", ()=>{
        const wrapper = shallowMount(FrontCard,{
            i18n,
            propsData: {
                pokemon: {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.text()).toContain("bulbasaur");
    });
});