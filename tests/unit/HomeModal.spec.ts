import { shallowMount,mount } from "@vue/test-utils";
import HomeModal from "../../src/components/HomeModal.vue";
import {i18n} from "../../src/locales/index";


describe("HomeModal.vue", ()=>{
    
    it("should mount a page", ()=>{
        const wrapper = shallowMount(HomeModal,{
            i18n,
            propsData: {
                modalPokemon : {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            }
        });
        expect(wrapper.find("#myModal").exists()).toBe(true);
    });

    it("should should show features of Pokemon", async()=>{
        const wrapper = mount(HomeModal,{
            i18n,
            propsData: {
                modalPokemon : {
                    id: 1,
                    name: "bulbasaur",
                    height:7,
                    weight:69,
                    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                    base_experience: 64,
                }
            }
        });
        expect(wrapper.find("img").exists()).toBe(true);
        expect(wrapper.findAll(".w-33").length).toBe(3); // height - weight - xp tutan 3 divi test ettik.
    });
});