const { fetchData } = require('../../js/data.js');


// initial state
const state = () => ({
    movieData : [],
})

// getters
const getters = {
    getMovieData : (state) => {
        return state.movieData;
    }
}

// mutations
const mutations = {
    setData(state, movieData) {
        state.movieData = movieData;
    }
}


// actions
const actions = {
    setData(context, payload) {
        let fetchedData = fetchData(payload.currentPageIndex, payload.pageOption);
        context.commit('setData', fetchedData.results);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}