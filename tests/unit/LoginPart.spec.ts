import { mount, shallowMount } from "@vue/test-utils";
import LoginPart from "../../src/components/LoginPart.vue";
import {i18n} from "../../src/locales/index";


describe("LoginPart.vue", ()=>{
    
    it("should mount a page", ()=>{
        const wrapper = mount(LoginPart,{
            i18n,
        });
        
        console.log(wrapper.html());
        expect(wrapper.exists()).toBe(true);
    });

    it("should finish firebase request successfully", ()=>{
        
    });
});