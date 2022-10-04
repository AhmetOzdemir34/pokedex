<template>
    <div>
        <img src="../assets/images/pokemon.png" class="css-img" alt="POKEDEX" />
        <div class="animation">
            <form style="max-width:70%;" class="mx-auto" @submit.prevent="">
            <input v-model="search" type="text" class="css-input" placeholder="Pokemon name or ID">
            <button type="submit" class="css-btn fa-solid fa-magnifying-glass"
            :class="{'light-text':!getMode}"
            ></button>
            </form>
        </div>
        <hr style="border-top:1px solid rgba(0,0,0,.5)" class="my-2"/>
        <div>
            <table class="text-center" style="width:100%">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>Weight</td>
                  <td>Height</td>
                  <td>Reset</td>
                </tr>
                <tr>
                  <td>
                    <button @click="nameASC" :class="{'light-text':!getMode}" class="order-icons fa-solid fa-arrow-down-a-z"></button>
                  </td>
                  <td>
                    <button @click="weightDESC" :class="{'light-text':!getMode}" class="order-icons fa-solid fa-arrow-down-z-a"></button>
                  </td>
                  <td>
                    <button @click="heightASC" :class="{'light-text':!getMode}" class="order-icons fa-solid fa-arrow-down-1-9"></button>
                  </td>
                  <td>
                    <button @click="reset" :class="{'light-text':!getMode}" class="order-icons fa-solid fa-power-off"></button>
                  </td>
                </tr>
                
              </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import { mainStore } from '@/store/main.module';
import { Component, Vue } from 'vue-property-decorator';
import HomePokemons from './HomePokemons.vue';

    @Component({
      components: {HomePokemons}
    })
    export default class  extends Vue {
        search= "" as string

        get getMode(){
          return mainStore.lightMode;
        }
        nameASC(): void{
          mainStore.nameASC;
        }
        heightASC(): void{
          mainStore.heightASC;
        }
        weightDESC(): void{
          mainStore.weightDESC;
        }
        reset(): void{
          mainStore.reset;
        }
    }
</script>

<style scoped>
.order-icons{
  font-size: 32px;
  border: 0;
  background-color: transparent;
}
.css-img{
    display: block;
    margin: 0 auto;
    object-fit: cover;
  }
  .animation{
    animation: initAnimation 2s;
  }
  .css-input{
    padding: 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background-color: #dedede;
    width: 85%;
    border: 0;
    font-size: 20px;
  }
  .css-btn{
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 20px;
    padding: 10px;
    width: 10%;
    border: 0;
    background-color: transparent;
  }
  @keyframes initAnimation {
    from {
      scale: 0.1;
      opacity: 0;

    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
  @media(max-width:800px){
    .css-img{
      max-width: 750px;
    }
  }
  @media(max-width:400px){
    .css-img{
      max-width: 350px;
    }
  }
</style>