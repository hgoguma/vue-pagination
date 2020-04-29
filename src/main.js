import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Pagination from './components/Pagination.vue'
import Test from './components/Test.vue'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

const routes = [
  {path : '/pagination', component: Pagination},
  {path : '/test', component: Test},
]

export const router = new VueRouter({
  routes
});

export const eventBus = new Vue({
  methods: {
    openModal() {
      this.$emit('openModal')
    },
    modifyData(movieId) {
      this.$emit('modifyData', movieId)
    }
  }
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
