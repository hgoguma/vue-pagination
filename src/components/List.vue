<template>
    <b-container class="mb-2">
        <b-row cols="5" cols-md="4" cols-xl="5">
            <b-col md="3" v-for="(data) in this.movieData" :key="data.id">
                <b-card
                    :title="data.title"
                    :img-src="data.poster_path"
                    :img-alt="data.title"
                    img-top
                    style="max-width: 18rem;"
                    class="mb-1"
                >
                    <b-card-text>{{data.original_title}}</b-card-text>
                    <b-button @click="onclickDelete(data.id)" variant="dark">삭제</b-button>
                    <b-button @click="onClickModify(data.id)"  variant="light">수정</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { eventBus } from '../main.js'
const { deleteData } = require('../js/data.js');

export default {
    data () {
        return {
            movieId : '',
        }
    },
    created() {
        this.fetchData();
    },
    computed: {
        ...mapState('page', {
            currentPageIndex : state => state.currentPageIndex,
            dataPerPageChanged : state => state.dataPerPageChanged,
            pageChanged : state => state.pageChanged,
        }),
        ...mapState('movieData', {
            movieData : state => state.movieData,
        }),
        ...mapGetters({
            pageOption : 'page/getPageOption'
        }),
    },
    watch : {
        dataPerPageChanged: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if(newVal) {
                    this.fetchData();
                    this.$store.commit('page/dataPerPageChanged', false);
                    return;
                }
            }
        },
        pageChanged: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if(newVal) {
                    this.fetchData();
                    this.$store.commit('page/pageChanged', false);
                    return;
                }
            }
        }
    },
    methods: {
        fetchData() {
            //fetchData에서 하는 일 : 현재 페이지, 페이지 옵션 던져서 데이터 받아오기 -> state 변경
            let option = {
                currentPageIndex : this.currentPageIndex,
                pageOption : this.pageOption
            }
            this.$store.commit('movieData/initMovieData'); //state 초기화
            this.$store.dispatch('movieData/setData', option); //데이터 가져오기
        },
        onclickDelete(id) {
            deleteData(id);
            alert('삭제 되었습니다.');
            this.$emit('onclickDelete');
        },
        onClickModify(movieId) {
            this.movieId = movieId;
            eventBus.openModal();
            eventBus.modifyData(movieId);
        },
    }
}
</script>