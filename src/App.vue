<template>
  <div id="app" style="min-height:100vh"
  :class="[getMode?'light light-text':'dark dark-text']">
    <nav class="container text-center py-2">
      <router-link class="mx-2" :class="{'light-text':!getMode}" to="/">Home</router-link>
      <router-link class="mx-2" :class="{'light-text':!getMode}" to="/favs">Favs</router-link>
      <button 
        class="fa-solid btn-mode"
        :class="[getMode ? 'fa-sun':'fa-moon light-text']"
        @click="toggle"
        >
      </button>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';  
  import { mainStore } from "./store/main.module";

  @Component
  export default class  extends Vue {
      
    get getMode():boolean{
      return mainStore.lightMode;
    }
    toggle(){
      mainStore.toggleMode();
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
.relative{
  position: relative;
  width: 100%;
  height: 100%;
}
.light{
  background: #f9f9f9 !important;
}
.light-text{
  color: grey !important;
}
.dark{
  background: rgb(41, 41, 41) !important;
}
.dark-text{
  color: rgb(195, 195, 195) !important;
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
.flex-row{
  flex-direction: row;
}
.items-center{
  align-items: center;
}
.justify-beetwee{
  justify-content: space-between;
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
