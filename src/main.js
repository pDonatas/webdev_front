import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@babel/polyfill'
import 'mutationobserver-shim'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Select2 from 'vue3-select2-component';

axios.defaults.baseURL = 'http://localhost/';

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

const app = Vue.createApp(App).use(store).use(router);
app.use(VueAxios, axios);
app.use(VueToast);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Select2', Select2)
app.mount('#app');