//const { fetchData } = require('../../js/data.js');

// initial state
const state = () => ({
    pageOption : {},
})

// getters
const getters = {
    getPageOption : (state) => {
        return state.pageOption;
    }
}

// mutations
const mutations = {
    setPageOption(state, data) {
        console.log('mutation?');
        console.log(data);
        state.pageOption = data;
    }
}

// actions
const actions = {
    setPageOption(context, payload) {
        console.log('setPageOption!');
        console.log(payload);
        //let data = fetchData(payload.currentPageIndex, payload.pageOption);
        context.commit('setPageOption', payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}