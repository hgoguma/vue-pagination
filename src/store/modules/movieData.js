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
    initMovieData(state) {
        state.movieData = [];
    },
    initSingleData(state) {
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
    initMovieDataRequest({commit}) { //movieData 초기화
        commit('initMovieData');
    },
    initSingleDataRequest({commit}) { //movieData 초기화
        commit('initSingleData');
    },
    setDataRequest({commit}, payload) {
        let data = fetchData(payload);
        commit('setData', data);
    },
    addDataRequest({commit}, payload) {
        let data = saveData(payload);
        if(data == "success") {
            commit('addDataSuccess', true);
        }
    },
    setAddDataSuccessRequest({commit}, payload) {
        commit('addDataSuccess', payload);
    },
    deleteDataRequest({commit}, payload) {
        let data = deleteData(payload);
        if(data == "success") {
            commit('deleteData', payload);
        }
    },
    getMovieDataRequest({commit}, payload) {
        let data = getMovieData(payload);
        commit('singleData', data);
    },
    modifyDataRequest({commit}, payload) {
        let data = modifyData(payload);
        if(data == "success") {
            commit('modifySuccess', true);
            commit('initSingleData');
        }
    },
    setModifySuccessRequest({commit}, payload) {
        commit('modifySuccess', payload);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}