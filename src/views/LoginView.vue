<template>
    <div>
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
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { LocaleMessages } from 'vue-i18n';

    @Component
    export default class extends Vue {
        email= "" as string;
        password= "" as string;
        isLogin= true as boolean;

        auth = getAuth();
        created(){
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.$router.push({name:'home'}) 
                }
            });
        }
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
        toggle(){
            this.isLogin = !this.isLogin; 
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
.inputs{
    width: 50%;
    margin: 0 auto;
}
.inps{
    width: 80%;
    display: block;
    margin: 10px auto;
    border: 0;
    padding: 0.4rem .8rem;
    font-size: 18px;
    text-align: center;
    border-radius: 3px;
}
.btn{
    display: block;
    margin: 0 auto;
    border: 0;
    padding: .3rem .7rem;
    border-radius: 3px;
    background-color: dodgerblue;
    cursor: pointer;
    color: white;
}
</style>