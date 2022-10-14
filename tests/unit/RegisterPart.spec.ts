import { mount, shallowMount } from "@vue/test-utils";
import RegisterPart from "../../src/components/RegisterPart.vue";
import {i18n} from "../../src/locales/index";


describe("RegisterPart.vue", ()=>{
    
    const registerResponseMock = {
        operationType:"signIn",
        user:{
            email:"ahmet@gmail.com",
            auth:{
                currentUser:{
                    uid:"DgVbqIgzqYUnIpudsH9oHoiAC082"
                }
            }
        }
    }

    const register = jest.fn(() => Promise.resolve(registerResponseMock));
    
    it("should mount a page", ()=>{
        const wrapper = shallowMount(RegisterPart,{
            i18n,
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("should get placeholder string", ()=>{
        const wrapper = shallowMount(RegisterPart,{
            i18n,
        });
        
        expect(wrapper.find(".inps3").attributes().placeholder).toEqual("username");
        expect(wrapper.find(".inps4").attributes().placeholder).toEqual("password");
    });

    it("test firebase signIn function",async()=>{
        const wrapper = shallowMount(RegisterPart,{
            i18n,
        });
        const reg = await register();
        expect(reg.user.email).not.toBeFalsy();
        expect(reg.user.auth.currentUser.uid).not.toBeNull();
        expect(reg.operationType).toEqual("signIn");
    })
});