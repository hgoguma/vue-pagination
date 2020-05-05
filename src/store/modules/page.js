//const { fetchData } = require('../../js/data.js');

// initial state
const state = () => ({
    currentPageIndex : 1,
    pageOption : {
        pageCount : 5,
        dataPerPage : 10,
    },
    pageCountChanged : false,
    dataPerPageChanged : false,
    pageChanged : false,
})

//getter
const getters = {
    getPageOption(state) {
        state.pageOption.pageCount = Number(state.pageOption.pageCount);
        state.pageOption.dataPerPage = Number(state.pageOption.dataPerPage);
        return state.pageOption
    }
}

// mutations
const mutations = {
    initCurrentPageIndex(state) {
        state.currentPageIndex = 1;
    },
    currentPageIndex(state, data) {
        state.currentPageIndex = data;
    },
    setPageOption(state, data) {
        state.pageOption = data;
    },
    pageCountChanged(state, data) {
        state.pageCountChanged = data;
    },
    dataPerPageChanged(state, data) {
        state.dataPerPageChanged = data;
    },
    pageChanged(state, data) {
        state.pageChanged = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}