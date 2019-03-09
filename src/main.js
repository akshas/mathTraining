import Vue from 'vue';
import App from './App.vue';
import AppMess from './components/message.vue';
import AppQuestion from './components/question.vue';
import AppRes from './components/resPage.vue';
import AppStart from './components/startPage.vue';

Vue.component('AppMess', AppMess);
Vue.component('AppQuestion', AppQuestion);
Vue.component('AppRes', AppRes);
Vue.component('AppStart', AppStart);
new Vue({
  el: '#app',
  render: app => app(App)
});
