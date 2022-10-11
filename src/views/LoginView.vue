<template>
    <div>
        <div class="text-center btnDiv" @click="toggle">{{toggleExpression?$t("loginView.loginTitle"):$t("loginView.registerTitle")}}</div>
        <div v-if="toggleExpression" class="container">
            <LoginPart />
        </div>
        <div v-else class="container">
            <RegisterPart />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import RegisterPart from '@/components/RegisterPart.vue';
    import LoginPart from '../components/LoginPart.vue';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

    @Component({
        components:{RegisterPart,LoginPart}
    })
    export default class extends Vue {
        email= "";
        password= "";
        toggleExpression = true;

        auth = getAuth();
        created(){
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.$router.push({name:'home'}).catch((err)=>{
                        if(err.name != "NavigationDuplicated"){
                            console.log(err.message);
                        }
                    })
                }   
            });
        }

        toggle(){
            this.toggleExpression = !this.toggleExpression;
        }
    }
</script>

<style scoped>
.btnDiv{
    padding: 2rem 0;
    color: white;
    font-weight: bold;
    background-image: linear-gradient(45deg, pink,yellow,dodgerblue, hotpink, black);
    box-shadow: 0 0 12px 6px grey;
    margin: 1rem 0 2rem 0;
    cursor: pointer;
}
</style>