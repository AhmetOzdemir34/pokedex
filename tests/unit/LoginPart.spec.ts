import { mount, shallowMount } from "@vue/test-utils";
import LoginPart from "../../src/components/LoginPart.vue";
import {i18n} from "../../src/locales/index";


describe("LoginPart.vue", ()=>{
    
    const signInResponseMock = {
        operationType:"signIn",
        user:{
            email:"ahmet@gmail.com"
        }
    }

    const signIn = jest.fn(() => Promise.resolve(signInResponseMock));
    
    it("should mount a page", ()=>{
        const wrapper = shallowMount(LoginPart,{
            i18n,
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("should get placeholder string", ()=>{
        const wrapper = shallowMount(LoginPart,{
            i18n,
        });
        
        expect(wrapper.find(".inps1").attributes().placeholder).toEqual("username");
        expect(wrapper.find(".inps2").attributes().placeholder).toEqual("password");
    });

    it("test firebase signIn function",async()=>{
        const wrapper = shallowMount(LoginPart,{
            i18n,
        });
        const sign = await signIn();
        expect(sign.user.email).not.toBeFalsy();
        expect(sign.operationType).toEqual("signIn");
    })
});