import Vue from 'vue'
import Vuex from 'vuex'
import movieData from './modules/movieData'
import pageOption from './modules/pageOption'


Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        movieData,
        pageOption,
    }
});