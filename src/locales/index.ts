import VueI18n from 'vue-i18n';
import Vue from 'vue'
import Eng from './en/index';
import Tur from './tr/index';
<<<<<<< HEAD

=======
import { mainStore } from '@/store/main.module';
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1
Vue.use(VueI18n);

const messages = {
    en:Eng,
    tr: Tur
  }

  export const i18n = new VueI18n({
<<<<<<< HEAD
    locale:  localStorage.getItem('lang') || 'en',
=======
    locale: 'en',
>>>>>>> 8e909a1826d2e30fe8ace845ef4997028c1701c1
    messages
  })