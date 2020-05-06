const state = {
    modalVisible : false,
}

const mutations = {
    modalVisible(state, data) {
        state.modalVisible = data;
    }
}

const actions = {
    showModalRequest({commit, dispatch}, payload) {
        commit('modalVisible', true); //state 변경
        //payload(movieId)로 API에서 데이터 호출하는 action 호출
        dispatch('movieData/getMovieDataRequest', payload, {root:true});
    },
    closeModalRequest({commit}) {
        console.log('모달 창 닫는 액션!')
        commit('modalVisible', false);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}