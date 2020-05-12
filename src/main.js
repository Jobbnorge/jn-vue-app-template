import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import { localizationService } from './services/localization.service';

/** Font Awesome Stuff **/
// TODO: remove if not required
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faUserSecret
} from '@fortawesome/pro-light-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faUserSecret)
Vue.component('fa-icon', FontAwesomeIcon)
/** END Font Awesome Stuff **/

Vue.config.productionTip = false;
Vue.use(VueI18n)
window.Vue = Vue;

Vue.prototype.$eventHub = new Vue();

const i18n = new VueI18n({
    locale: localizationService.selectedLocalization
})

new Vue({
    i18n,
    render: h => h(App)
}).$mount('#app');