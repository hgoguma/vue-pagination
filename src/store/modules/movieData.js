const { fetchData, saveData } = require('../../js/data.js');


// initial state
const state = () => ({
    totalData : 0,
    movieData : [],
    addDataSuccess : false,
})

// mutations
const mutations = {
    initMovieData(state) { //movieData 초기화
        state.movieData = [];
    },
    setData(state, data) { 
        state.totalData = data.totalData;
        state.movieData = data.results;
    },
    addData(state, data) {
        state.addDataSuccess = data;
    }
}

// actions
const actions = {
    setData({commit}, payload) {
        let data = fetchData(payload);
        commit('setData', data);
    },
    addData({commit}, payload) {
        //데이터 api에 연결해서 push 하기
        let data = saveData(payload);
        if(data == "success") {
            commit('addData', true);
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}