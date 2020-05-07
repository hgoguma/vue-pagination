const { fetchData, getMovieData } = require('../../js/data.js');

// initial state
const state = {
    totalData : 0,
    movieData : [],
    singleData : {},
}

const getters = {
    getMovieData(state) {
        return state.movieData;
    },
    getTotalData(state) {
        return state.totalData;
    },
}

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
    
    singleData(state, data) {
        state.singleData = data;
    },

    // modifiedMovieData(state, modifiedData) {
    //     let index = state.movieData.findIndex( element => element.id === modifiedData.id ); //해당되는 배열의 index 가져오기
    //     Vue.set(state.movieData, index, modifiedData);
    //     //Vue.set(수정할 state, key값 or index , 대체할 state)
    //     //state.movieData[index] = modifiedData; -> 그냥 할당하면 vue가 state의 변화를 감지 못함.
    // }
}

// actions
const actions = {
    initMovieData(context) { //movieData 초기화
        context.commit('initMovieData');
    },

    initSingleData(context) { //movieData 초기화
        context.commit('initSingleData');
    },

    setData(context, pageOption) {
        context.dispatch('initMovieData');
        let data = fetchData(pageOption);
        context.commit('setData', data);
    },
    
    getMovieDataRequest(context, payload) {
        let data = getMovieData(payload);
        context.commit('singleData', data);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}