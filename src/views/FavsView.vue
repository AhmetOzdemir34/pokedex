<template>
    <div id="rootFav">
        <div class="flex flex-row flex-wrap justify-start items-start">
            <div v-for="group,i in favsGroups" :key="i" class="group-card">
                <div class="mini-card">
                    <h2 :class="[getMode?'lightModeLocal':'darkModeLocal']">{{group.name}} <span class="delete-btn" @click="deleteGroup(group.id)"><i class="fa-sharp fa-solid fa-trash"></i></span></h2>
                    <hr style="margin:12px 0;" />
                    <div v-if="group.items.length>0" class="card-keeper">
                        <div v-for="item,i in group.items" :key="i" class="item">
                            <img :src="item.imgUrl" :alt="item.name" class="image" />
                            <div>
                                <p style="margin-top:14px;">{{item.name}}</p>
                                <p class="delete-btn" @click="deleteIt(group.id, group.items, item.name)">{{$t("favsView.deleteIt")}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
    import { db } from '@/main';
    import { getAuth, onAuthStateChanged } from '@firebase/auth';
    import { mainStore } from '@/store/main.module';

    @Component
    export default class  extends Vue {
        favsGroups: {
            id:string,
            owner:string,
            name:string,
            items: {
                name:string,
                imgUrl:string
            }[],
            realItems?: any[]
        }[] = [];
        auth = getAuth();
        async created(){
            onAuthStateChanged(this.auth, (user) => {
                if (!user) {
                    this.$router.push({name:'login'}) 
                }
            });
            const querySnapshot : any = await getDocs(collection(db, "favourites"));
            querySnapshot.forEach((doc:any) => {
                if(this.auth.currentUser!.email === doc.data().owner){
                    this.favsGroups.push({...doc.data(), id:doc.id});
                }
            });
        }
        get getMode():boolean{
            return mainStore.lightMode;
        }
        async deleteGroup(id:string){
            await deleteDoc(doc(db, "favourites", id));
            this.favsGroups = this.favsGroups.filter((e)=> e.id!==id);
        }
        async deleteIt(id:string, oldItems:any, name:string){
             const ref = doc(db, 'favourites', id);
            await updateDoc(ref, {
                items: oldItems.filter((e:any) => e.name !== name),
            }); 
            this.favsGroups.forEach(group =>{
                if(group.id == id){
                    group.items = group.items.filter(e => e.name !== name);
                }
            })
        }
    }
</script>

<style scoped>
.group-card{
    width: 25%;
    padding: 10px;
}
.lightModeLocal{
    color: #333;
}
.darkModeLocal{
    color: #333;
}
#rootFav{
    max-width: 1080px;
    margin: 0 auto;
}
@media(max-width:900px){
    .group-card{
    width: 33%;
}
}
@media(max-width:700px){
    .group-card{
    width: 50%;
}
}
@media(max-width:500px){
    .group-card{
    width: 100%;
}
}
.delete-btn{
    color: rgb(229, 172, 172);
    font-weight: lighter;
    transition: .4s all ease;
    cursor: pointer;
}
.delete-btn:hover{
    color: rgb(228, 101, 101);
    text-decoration: underline;
}
.card-keeper{
    height: 285px;
    overflow: auto;
}
.mini-card{
    border-radius: 4px;
    text-align: center;
    padding: 8px 2px;
    background-color: rgb(203, 203, 203);
}
.item{
    color: white;
    font-weight: bold;
    border: 1px solid rgba(0,0,0,.3);
    margin: 5px 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 15px;
    border-radius: 30px;
    background-color: rgb(83, 83, 83);
}
.image{
    width: 30%;
    height: 100%;
    object-fit: contain;
    display: block;
}
</style>