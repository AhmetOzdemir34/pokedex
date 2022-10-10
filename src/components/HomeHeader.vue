<template>
    <div>
        <img src="../assets/images/pokemon.png" class="css-img" alt="POKEDEX" />
        <div class="animation">
            <form style="max-width:70%;" class="mx-auto" @submit.prevent="searching">
            <input v-model.trim="search" type="text" @input="clearMoves" class="css-input" :placeholder="getPlaceholder">
            <button type="submit" class="css-btn fa-solid fa-magnifying-glass"
            :class="[getMode?'lightModeLocal':'darkModeLocal']"
            ></button>
            </form>
        </div>
        <hr style="border-top:1px solid rgba(0,0,0,.5)" class="my-2"/>
        <div>
            <table class="text-center" style="width:100%">
              <tbody>
                <tr>
                  <td>{{$t("homeHeader.filters.name")}}</td>
                  <td>{{$t("common.weight")}}</td>
<<<<<<< HEAD
                  <td>{{$t("common.weight")}}</td>
=======
                  <td>{{$t("common.height")}}</td>
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1
                  <td>{{$t("homeHeader.filters.reset")}}</td>
                </tr>
                <tr>
                  <td>
                    <button @click="nameASC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-a-z mx-1"></button>
                    <button @click="nameDESC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-z-a mx-1"></button>
                  </td>
                  <td>
                    <button @click="weightASC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-1-9 mx-1"></button>
                    <button @click="weightDESC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-9-1 mx-1"></button>
                  </td>
                  <td>
                    <button @click="heightASC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-1-9 mx-1"></button>
                    <button @click="heightDESC" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-arrow-down-9-1 mx-1"></button>
                  </td>
                  <td>
                    <button @click="reset" :class="[getMode?'lightModeLocal':'darkModeLocal']" class="order-icons fa-solid fa-power-off"></button>
                  </td>
                </tr>
                
              </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import { mainStore } from '@/store/main.module';
    import { Pokemons } from '@/types';
    import { Component, Vue } from 'vue-property-decorator';
    import HomePokemons from './HomePokemons.vue';

    @Component({
      components: {HomePokemons}
    })
    export default class  extends Vue {
        search= "";
        results= [] as Pokemons[];

        get getMode(){
          return mainStore.lightMode;
        }
        get getPlaceholder():string|undefined{
          return String(this.$t("homeHeader.placeholder"));
        }
        clearMoves(){
          mainStore.clearMoves();
        }
        nameASC(): void{
          mainStore.nameASC();
        }
        nameDESC(): void{
          mainStore.nameDESC();
        }
        heightASC(): void{
          mainStore.heightASC();
        }
        heightDESC(): void{
          mainStore.heightDESC();
        }
        weightASC(): void{
          mainStore.weightASC();
        }
        weightDESC(): void{
          mainStore.weightDESC();
        }
        reset(): void{
          mainStore.reset();
        }
        searching(){
          mainStore.searching(this.search);
        } 
    }
</script>

<style scoped>
.order-icons{
  font-size: 32px;
  border: 0;
  background-color: transparent;
}
.lightModeLocal{
  color: #333;
}
.darkModeLocal{
  color: #f2f2f2;
}
td button{
  cursor: pointer;
}
.result-card{
  border: 1px solid black;
  border-radius: 5px;
}
.css-img{
    display: block;
    margin: 0 auto;
    object-fit: cover;
  }
  .animation{
    animation: initAnimation 2s;
  }
  .mx-1{
    margin: 0 3px;
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