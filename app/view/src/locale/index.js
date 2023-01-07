import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from '@/api/http/axios';
import {
  getComplexType,
} from '@/utils';
import defLan from './default';

Vue.use(VueI18n);

const lang = window.location.href.match(/[a-z]+_[A-Z]+/)[0];

const messages = {
  def_Lan: {
    ...defLan,
  },
};
export const i18n = new VueI18n({
  locale: 'def_Lan',
  messages,
  missing() {
    return '';
  },
});

export function changeLanguage(lan) {
  axios({
    url: '/getLocale',
    method: 'get',
    hostType: 'def',
  }).then((res) => {
    if (res.code) {
      return;
    }
    const { data } = res;
    if (getComplexType(data) !== 'Object') return;
    i18n.locale = lan;
    i18n.setLocaleMessage(lan, data);
  }).catch((error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
}

changeLanguage(lang);
