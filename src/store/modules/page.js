// initial state
const state = {
    currentPageIndex : 1,
    // pageCount : 5,
    // dataPerPage : 10,
    pageOption : {
        pageCount : 5,
        dataPerPage : 10,
    },
    pageCountChanged : false,
    dataPerPageChanged : false,
    pageChanged : false,
}

//getter
const getters = {
    getPageOption(state) {
        state.pageOption.pageCount = Number(state.pageOption.pageCount);
        state.pageOption.dataPerPage = Number(state.pageOption.dataPerPage);
        return state.pageOption
    },
    getPageCount(state) {
        return state.pageCount = Number(state.pageCount);
    },
    getDataPerPage(state) {
        return state.dataPerPage = Number(state.dataPerPage);
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
    //

    pageCountChanged(state, data) {
        state.pageCountChanged = data;
    },
    dataPerPageChanged(state, data) {
        state.dataPerPageChanged = data;
    },
    pageChanged(state, data) {
        state.pageChanged = data;
    },
}

const actions = {
    initCurrentPageIndex({commit}) {
        commit('initCurrentPageIndex');
    },
    setPageOptionRequest({commit}, payload) {
        commit('setPageOption', payload);
    },
    pageCountChangeRequest({commit}, payload) {
        commit('pageCountChanged', payload);
    },
    dataPerPageChangeRequest({commit}, payload) {
        commit('dataPerPageChanged', payload);
    },
    pageChangeRequest({commit}, payload) {
        commit('pageChanged', payload);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}