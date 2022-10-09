import VueI18n from 'vue-i18n';
import Vue from 'vue'
import Eng from './en/index';
import Tur from './tr/index';
import { mainStore } from '@/store/main.module';
Vue.use(VueI18n);

const messages = {
    en:Eng,
    tr: Tur
  }

  export const i18n = new VueI18n({
    locale: 'en',
    messages
  })