<template>
    <div>
<<<<<<< HEAD
        <div class="text-center btnDiv" @click="toggle">{{toggleExpression?$t("loginView.loginTitle"):$t("loginView.registerTitle")}}</div>
        <div v-if="toggleExpression" class="container">
            <LoginPart />
        </div>
        <div v-else class="container">
            <RegisterPart />
=======
        <div v-if="isLogin" class="container">
            <div class="text-center" style="margin:1rem 0;" @click="toggle">{{$t("loginView.loginTitle")}}</div>
            <h2 class="text-center">{{$t("loginView.login")}}</h2>
            <div class="inputs">
                <input type="text" v-model="email" class="inps" :placeholder="getUsernamePlaceholder" />
                <input type="password" v-model="password" class="inps" :placeholder="getPasswordPlaceholder" />
                <button type="button" class="btn" @click="signIn">{{$t("loginView.loginButton")}}</button>
            </div>
        </div>
        <div v-else class="container">
            <div class="text-center" style="margin:1rem 0;" @click="toggle">{{$t("loginView.registerTitle")}}</div>
            <h2 class="text-center">{{$t("loginView.register")}}</h2>
            <div class="inputs">
                <input type="text" v-model="email" class="inps" :placeholder="getUsernamePlaceholder" />
                <input type="password" v-model="password" class="inps" :placeholder="getPasswordPlaceholder" />
                <button type="button" class="btn" @click="register">{{$t("loginView.registerButton")}}</button>
            </div>
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
<<<<<<< HEAD
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import RegisterPart from '@/components/RegisterPart.vue';
    import LoginPart from '../components/LoginPart.vue';
=======
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { LocaleMessages } from 'vue-i18n';
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1

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
                    this.$router.push({name:'home'}) 
                }
            });
        }
<<<<<<< HEAD
=======
        signIn(){
            const auth = getAuth();
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
            .then((data)=>{
                this.$router.push({name:"home"});
                
            }).catch(err =>{
                alert(err.message);
                
            })
        }
        register(){
            const auth = getAuth();
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            .then((data)=>{
                console.log(auth.currentUser);
                
            }).catch(err =>{
                alert(err.message);
                
            })
        }
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1
        toggle(){
            this.toggleExpression = !this.toggleExpression;
        }
        get getUsernamePlaceholder():any{
            return this.$t("loginView.username");
        }
        get getPasswordPlaceholder():any{
            return this.$t("loginView.password");
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