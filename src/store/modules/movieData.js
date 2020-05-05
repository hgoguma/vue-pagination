const { fetchData } = require('../../js/data.js');


// initial state
const state = () => ({
    totalData : 0,
    movieData : [],
})

// // getters
// const getters = {
//     getMovieData : (state) => {
//         return state.movieData;
//     }
// }

// mutations
const mutations = {
    initMovieData(state) { //movieData 초기화
        state.movieData = [];
    },
    setData(state, data) { 
        state.totalData = data.totalData;
        state.movieData = data.results;
    }
}

// actions
const actions = {
    setData({commit}, payload) {
        let data = fetchData(payload);
        commit('setData', data);
    }
}

export default {
    namespaced: true,
    state,
    //getters,
    actions,
    mutations,
}