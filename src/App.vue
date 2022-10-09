<template>
  <div id="app" style="min-height:100vh"
  :class="[getMode?'lightMode':'darkMode']">
    <nav class="container text-center py-2">
      <router-link class="mx-2" :class="[getMode?'lightMode':'darkMode']" to="/">{{$t("nav.home")}}</router-link>
      <router-link class="mx-2" :class="[getMode?'lightMode':'darkMode']" to="/favs">{{$t("nav.favs")}}</router-link>
      <button class="mx-2" :class="{'light-text':!getMode}" @click="logout">{{$t("nav.logout")}}</button>
      <select @change="changeLanguage">
        <option selected value="en">🇺🇸 ENG</option>
        <option value="tr">🇹🇷 TUR</option>
      </select>
      <button 
        class="fa-solid btn-mode"
        :class="[getMode ? 'fa-sun lightMode':'fa-moon darkMode']"
        @click="toggle"
        >
      </button>
    </nav>
    {{ $t("message.hello") }}
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { getAuth, signOut } from '@firebase/auth';
  import { Component, Vue } from 'vue-property-decorator';  
  import { mainStore } from "./store/main.module";
  import {i18n} from './locales'
  @Component
  export default class extends Vue {
      
    get getMode():boolean{
      return mainStore.lightMode;
    }
    changeLanguage(event:any){
      i18n.locale = event.target.value;
    }
    toggle(){
      mainStore.toggleMode();
    }
    logout(){
      const auth = getAuth();
      signOut(auth).then(()=>{
        this.$router.push({name:"login"});
      }).catch((err)=>{
        alert(`Oturum Hata Tanımı: ${err.message}\nTekrar deneyiniz.`);
      })
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}
.ml-2{
  margin-left: 1rem;
}
.mt-2rem{
  margin-top: 2rem;
}
.bg-transparent{
  background-color: transparent;
}
.h-full{
  height: 100%;
}
.relative{
  position: relative;
  width: 100%;
  height: 100%;
}
.lightMode{
  background-color: #f3f3f3 !important;
  color: rgb(20,20,20) !important;
}
.darkMode{
  background-color: rgb(20,20,20) !important;
  color: #f3f3f3 !important;
}
.container{
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 .4rem;
}
.text-center{
  text-align: center;
}
.mx-2{
  margin: 0 6px;
}
.mx-auto{
  margin: 0 auto;
}
.btn-mode{
  background-color: transparent;
  font-size: 20px;
  border: 0;
  margin: 0 10px;
  cursor: pointer;
}
.py-2{
  padding: 5px 0;
}
.my-2{
  margin: 15px 0;
}
.flex{
  display: flex;
}
.pointer{
  cursor: pointer;
}
.flex-wrap{
  flex-wrap: wrap;
}
.flex-nowrap{
  flex-wrap: nowrap;
}
.justify-center{
  justify-content: center;
}
.flex-row{
  flex-direction: row;
}
.flex-col{
  flex-direction: column;
}
.items-center{
  align-items: center;
}
.justify-beetween{
  justify-content: space-between;
}
.justify-start{
  justify-content: flex-start;
}
.items-start{
  align-items: flex-start;
}
.p-2{
  padding: 5px;
}
.w-33{
  width: 33%;
}
.underline{
  text-decoration: underline;
}
.mt-2{
  margin-top: 5px;
}
.p-5{
  padding: 2rem;
}
.light-border{
  border: 1px solid rgba(0,0,0,.2) !important;
}
.dark-border{
  border: 1px solid rgba(255,255,255,.4) !important;
}
</style>
