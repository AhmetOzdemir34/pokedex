import VueI18n from 'vue-i18n';
import Vue from 'vue'
import Eng from './en/index';
import Tur from './tr/index';
Vue.use(VueI18n);

const messages = {
    en:Eng,
    tr: Tur
  }

  export const i18n = new VueI18n({
    locale:  localStorage.getItem('lang') || 'en',
    messages
  })