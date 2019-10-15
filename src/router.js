import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Scan from './views/Scan.vue';
import ScanManual from './views/ScanManual.vue';
import Add from './views/Add.vue';
import Magasin from './views/Magasin.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/scan',
      name: 'scan',
      component: Scan
    },
    {
      path: '/scanmanual',
      name: 'scanmanual',
      component: ScanManual
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/magasin',
      name: 'magasin',
      component: Magasin
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
