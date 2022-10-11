<template>
    <div style="z-index: 1;" class="back flex flex-col flex-nowrap justify-center items-center" :class="[getMode?'lightModeLocal':'darkModeLocal']">
        <div class="h-33 text-center">
            <p style="font-size: 36px;">{{pokemon.height}}</p>
            <p style="font-size:18px;">{{$t("common.height")}}</p>
        </div>
        <div class="h-33 text-center">
            <p style="font-size: 36px;">{{pokemon.weight}}</p>
            <p style="font-size:18px;">{{$t("common.weight")}}</p>
        </div>
        <div>
            <div class="dropdown">
                <div style="z-index: 2 !important;background-color: #333; color:white;" class="dropdown-content">
                    <select @change="addToExistGroup($event,pokemon)">
                        <option class="group" selected value="">---</option>
                        <option class="group" :value="group.name" v-for="group,i in favsGroup" :key="i">
                            {{group.name}}
                        </option>
                    </select>
                    <hr style="margin:10px 0;"/>
                    <input type="text" v-model="groupName" class="new-group-input" placeholder="Group Name"/>
                    <div class="new-group" style="margin-top:5px;" @click="newGroup(pokemon)">{{$t("backCard.newGroup")}}</div>
                </div>
                <button class="btn">{{$t("backCard.favs")}}</button>
            </div>
            <div class="dropdown">
                <div style="z-index: 2 !important;" class="dropdown-content">
                    <div @click="oModal(pokemon)">{{$t("backCard.withModal")}}</div>
                    <div @click="oNav(pokemon)">{{$t("backCard.withDrawer")}}</div>
                    <router-link :to="getUrl(pokemon.name)">{{$t("backCard.withPage")}}</router-link>
                </div>
                <button class="btn">{{$t("backCard.details")}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { db } from '@/main';
    import { mainStore } from '@/store/main.module';
    import { Pokemons } from '@/types';
    import { arrayUnion, collection, doc, DocumentData, getDocs, QuerySnapshot, setDoc, updateDoc } from '@firebase/firestore';
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { nanoid } from 'nanoid'
    import { getAuth } from '@firebase/auth';
    
    @Component
    export default class extends Vue {
        
        @Prop()
        pokemon !: Pokemons;
        @Prop()
        drawerPokemon !: Pokemons;
        @Prop()
        modalPokemon !: Pokemons;
        @Prop()
        favsGroup !: {
            id:string,
            owner:string,
            name:string,
            items: {
                name:string,
                imgUrl:string
            }[],
        }[];
        groupName = "";
        auth = getAuth();

        async addToExistGroup(event:Event,pokemon:Pokemons){
            var realDoc = "";
            const querySnapshot : QuerySnapshot<DocumentData> = await getDocs(collection(db, "favourites"));
            querySnapshot.forEach((doc:DocumentData) => {
                if((event.target as HTMLSelectElement).value === doc.data().name){
                    realDoc = doc.id;
                }
            });
            try{
                const ref = doc(db, "favourites", realDoc);

                await updateDoc(ref, {
                    items: arrayUnion({
                        name:pokemon.name,
                        imgUrl: pokemon.imageUrl
                    })
                });
            }catch(err:Error|unknown){
                if(err instanceof Error){
                    alert(err.message);
                }
            }
            
        }
        async newGroup(pokemon:Pokemons){            
            if(!this.groupName || this.favsGroup.some(e => e.name === this.groupName)){
                return alert("Boş grup adı veya varolan bir grup adı girilemez.");
            }
            try{
            await setDoc(doc(db, "favourites", nanoid()), {
                name: this.groupName,
                owner: this.auth.currentUser?.email,
                items: [{
                    name:pokemon.name,
                    imgUrl: pokemon.imageUrl 
                }]
            });
            this.favsGroup.push({
                owner: this.auth.currentUser?.email,
                name:this.groupName,
            });
            }catch(err:Error|unknown){
                if(err instanceof Error){
                    alert("Grup oluşturma sırasında beklenmedik bir hata oluştu.\n"+err.message);
                }
            }
        }
        getUrl(name:string): string{
            return `pokemon/${name}`
        }
        oModal(data:Pokemons) {
            this.$emit('oModal', data);
        }
        oNav(data:Pokemons) {
            this.$emit('oNav', data);
        }
        get getMode():boolean{
        return mainStore.lightMode;
        }
    }
</script>

<style scoped>
.lightModeLocal{
    background-color: #e3b2008b !important;
    color: black !important;
}
.darkModeLocal{
    background-color: rgba(255, 255, 255, 0.8) !important;
    color: #2d2d2df8 !important;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.new-group-input{
    padding: .2rem;
}
.new-group{
    background-color: #333;
    padding: .3rem;
    border-radius: 8px;
}
.new-group:hover{
    background: #bbb;
    color: black;
}
.h-33{
    height: 50%;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-content>div:nth-last-of-type(2){
    margin: 2px 0;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content>div{
    cursor: pointer;
}
.back{
    margin: 5px;
    position: absolute;
    width: 100%;
    height: 100% !important;
    backface-visibility: hidden;
    background: #fafafa;
    color: #333;
    transform: rotateY(180deg);
    border-radius: 5px;
}
.i-like{
    background: rgb(255, 137, 116);
    color: white;
}
.i-dislike{
    background: rgb(116, 116, 255);
    color: white;
}
.btn{
    width: 180px;
    display: block;
    padding: 10px;
    margin: 2px 0;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    transition: .5s all ease;
}
.icon{
    font-size: 22px;
}
.btn:hover{
    background-color: rgb(75, 75, 75);
    color: white;
}
</style>