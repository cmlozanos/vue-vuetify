import Vue from 'vue';
import Vuex from 'vuex';
import magasin from './modules/magasin'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    magasin,
  },
});
