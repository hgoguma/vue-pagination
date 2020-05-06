import Vue from 'vue'
import Vuex from 'vuex'
import movieData from './modules/movieData'
import page from './modules/page'
import modal from './modules/modal'


Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        movieData,
        page,
        modal
    }
});