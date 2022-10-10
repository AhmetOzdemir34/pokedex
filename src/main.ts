import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import * as firebase from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { rtdbPlugin } from "vuefire";
import { firestorePlugin } from 'vuefire'
import {i18n} from './locales';

Vue.use(firestorePlugin);
Vue.use(rtdbPlugin);

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDqY3LMiIXzyuidexm8jEPnPZ2KE-fmQno",
  authDomain: "pokedex-e11ea.firebaseapp.com",
  projectId: "pokedex-e11ea",
  storageBucket: "pokedex-e11ea.appspot.com",
  messagingSenderId: "613217481653",
  appId: "1:613217481653:web:9de63bd43f672b2763dffc"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
