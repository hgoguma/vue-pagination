//import Vue from 'vue';

// initial state
const state = {
    currentPageIndex: 1,
    pageOption: {
        pageCount: 5,
        dataPerPage: 10,
    },
    totalPage: 0, 
    pageRange: [], //[startPage, endPage] 배열
    displayPageArray: [], //실제 보여주는 페이지 범위
    hasMorePage: false, //더보기 버튼 여부
    hasPrevPage : false, //이전 더보기 버튼 여부
}

//getter
const getters = {
    getPageOption(state) {
        state.pageOption.pageCount = Number(state.pageOption.pageCount);
        state.pageOption.dataPerPage = Number(state.pageOption.dataPerPage);
        return state.pageOption;
    },
    getPageCount(state) {
        return state.pageCount = Number(state.pageCount);
    },
    getDataPerPage(state) {
        return state.dataPerPage = Number(state.dataPerPage);
    },
    getTotalPage(state) {
        return state.totalPage;
    },
    getPageRange(state) {
        return state.pageRange;
    },
    getDisplayPageArray(state) {
        return state.displayPageArray;
    },
    getHasMorePage(state) {
        return state.hasMorePage;
    },
    getHasPrevPage(state) {
        return state.hasPrevPage;
    }
}

// mutations
const mutations = {
    //초기화
    initCurrentPageIndex(state) {
        state.currentPageIndex = 1;
    },
    initPageRange(state) {
        state.pageRange = [];
    },
    initDisplayPageArray(state) {
        state.displayPageArray = [];
    },
    currentPageIndex(state, data) {
        state.currentPageIndex = data;
    },
    setPageOption(state, data) {
        state.pageOption = data;
        //state.pageOption = Object.assign({}, state.pageOption, data);
    },
    setTotalPage(state, data) {
        state.totalPage = data;
    },
    setPageRange(state, data) {
        state.pageRange = data;
    },
    setDisplayPageArray(state, pageIndex) {
        state.displayPageArray.push(pageIndex);
    },
    setHasMorePage(state, data) {
        state.hasMorePage = data;
    },
    setHasPrevPage(state, data) {
        state.hasPrevPage = data;
    }
}


//pageOption 을 통해 하는 처리 : totalPage & 보여지는 페이지 범위 & pageRange[startPage, endPage] 계산해서 state 변경


const actions = {
    initCurrentPageIndex(context) {
        context.commit('initCurrentPageIndex');
    },

    initPageRange(context) {
        context.commit('initPageRange');
    },

    setPageOption(context, pageOption) {
        context.dispatch('initCurrentPageIndex');
        context.commit('setPageOption', pageOption);
    },
    
    //총 데이터 개수 구하기
    setTotalPage(context, pageOption) {
        let totalPage = Math.ceil(context.rootState.movieData.totalData/pageOption.dataPerPage);
        context.commit('setTotalPage', totalPage);
    },

    chagePageAndSetPagination(context, payload) {
        context.dispatch('setTotalPage', payload.pageOption);
        context.dispatch('setPageRange', payload.currentPageIndex);
        let startPage = context.state.pageRange[0];
        context.dispatch('setPagination',startPage);
    },

    //startPage, endPage 구해서 pageRange 배열 만드는 함수
    setPageRange(context, currentPageIndex) {
        context.dispatch('initPageRange');
        
        let endPage = (Math.ceil(currentPageIndex / context.state.pageOption.pageCount) * context.state.pageOption.pageCount);
        let startPage = (endPage - context.state.pageOption.pageCount)+1;
        if(endPage > context.state.totalPage) {
            endPage = context.state.totalPage;
        }
        if(context.state.totalPage < 1 || context.state.totalPage == 1) {
            startPage = endPage;
        }
        //state 바꾸기
        let data = [startPage, endPage];
        context.commit('setPageRange', data);
    },

     //페이징 범위 처리하는 함수
    setPagination(context, startPage) {
        //displayArray 초기화
        context.commit('initDisplayPageArray');
        for(let i = 0; i < context.state.pageOption.pageCount; i++) {
            let pageIndex = startPage + i;
            if(pageIndex > context.state.totalPage) {
                break;
            }
            //state 변경
            context.commit('setDisplayPageArray', pageIndex);
        }
        if(context.state.totalPage > context.state.displayPageArray[context.state.displayPageArray.length -1 ]) {
            context.dispatch('setHasMorePage', true);
        }
        if(context.state.totalPage === context.state.displayPageArray[context.state.displayPageArray.length -1 ]) {
            context.dispatch('setHasMorePage', false);
        }

        if(context.state.currentPageIndex === 1) {
            context.dispatch('setHasPrevPage', false);
        }
        //현재 페이지가 보여지는 페이지 개수보다 크면
        if(context.state.currentPageIndex > context.state.pageOption.pageCount) {
            context.dispatch('setHasPrevPage', true);
        }
    },
    setHasMorePage(context, payload) {
        context.commit('setHasMorePage', payload);
    },
    setHasPrevPage(context, payload) {
        context.commit('setHasPrevPage', payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}