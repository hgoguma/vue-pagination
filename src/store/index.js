import Vue from 'vue'
import Vuex from 'vuex'
import movieData from './modules/movieData'
import page from './modules/page'


Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        movieData,
        page,
    }
});