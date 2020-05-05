const { fetchData, saveData, deleteData, getMovieData, modifyData } = require('../../js/data.js');

// initial state
const state = () => ({
    totalData : 0,
    movieData : [],
    singleData : {},
    addDataSuccess : false,
    modifySuccess : false,
})

// mutations
const mutations = {
    initMovieData(state) { //movieData 초기화
        state.movieData = [];
    },
    initSingleData(state) { //movieData 초기화
        state.singleData = {};
    },
    setData(state, data) { 
        state.totalData = data.totalData;
        state.movieData = data.results;
    },
    addDataSuccess(state, data) {
        state.addDataSuccess = data;
    },
    deleteData(state, id) {
        state.totalData--;
        state.movieData = state.movieData.filter(element => element.id !== id);
    },
    singleData(state, data) {
        state.singleData = data;
    },
    modifySuccess(state, data) {
        state.modifySuccess = data;
    }
}

// actions
const actions = {
    setData({commit}, payload) {
        let data = fetchData(payload);
        commit('setData', data);
    },
    addData({commit}, payload) {
        let data = saveData(payload);
        if(data == "success") {
            commit('addDataSuccess', true);
        }
    },
    deleteData({commit}, payload) {
        let data = deleteData(payload);
        if(data == "success") {
            commit('deleteData', payload);
        }
    },
    getMovieData({commit}, payload) {
        let data = getMovieData(payload);
        commit('singleData', data);
    },
    modifyData({commit}, payload) {
        let data = modifyData(payload);
        if(data == "success") {
            commit('modifySuccess', true);
            commit('initSingleData');
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}