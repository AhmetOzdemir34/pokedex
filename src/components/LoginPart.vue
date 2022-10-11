<template>
    <div>
        <h2 class="text-center">{{$t("loginView.login")}}</h2>
        <div class="inputs">
            <input type="text" v-model="email" class="inps" :placeholder="getUsernamePlaceholder" />
            <input type="password" v-model="password" class="inps" :placeholder="getPasswordPlaceholder" />
            <button type="button" class="btn" @click="signIn">{{$t("loginView.loginButton")}}</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        email= "";
        password= "";

        signIn(){
            signInWithEmailAndPassword(getAuth(), this.email, this.password).catch(err =>{
                alert(err.message);
            })
        }
        get getUsernamePlaceholder() : string | undefined{
            return String(this.$t("loginView.username"));
        }
        get getPasswordPlaceholder(){
            return String(this.$t("loginView.password"));
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