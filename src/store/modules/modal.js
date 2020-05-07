const state = {
    modalVisible : false,
}

const mutations = {
    modalVisible(state, data) {
        state.modalVisible = data;
    }
}

const actions = {
    showModalRequest(context, movieId) {
        context.commit('modalVisible', true); //state 변경
        //payload(movieId)로 API에서 데이터 호출하는 action 호출
        context.dispatch('movieData/getMovieDataRequest', movieId, {root : true} );
    },
    closeModalRequest(context) {
        context.commit('modalVisible', false);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}