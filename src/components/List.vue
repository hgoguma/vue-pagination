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
import { mapGetters, mapState, mapActions } from 'vuex';

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
            currentPageIndex: state => state.currentPageIndex,
            dataPerPageChanged: state => state.dataPerPageChanged,
            pageChanged: state => state.pageChanged,
        }),
        ...mapState('movieData', {
            movieData: state => state.movieData,
            addDataSuccess: state => state.addDataSuccess,
            modifySuccess: state => state.modifySuccess,
        }),
        ...mapGetters({
            pageOption: 'page/getPageOption'
        }),
    },
    watch: {
        dataPerPageChanged: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if(newVal) {
                    this.fetchData();
                    this.dataPerPageChangeRequest(false);
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
                    this.pageChangeRequest(false);
                    return;
                }
            }
        },
        addDataSuccess: {
            handler(newVal) {
                if(newVal) {
                    this.fetchData();
                    this.setAddDataSuccessRequest(false);
                }
            }
        },
        modifySuccess: {
            handler(newVal) {
                if(newVal) {
                    this.fetchData();
                    this.setModifySuccessRequest(false);
                }
            }
        },
    },
    methods: {
        ...mapActions('movieData', [
            'initMovieDataRequest',
            'setDataRequest',
            'deleteDataRequest',
            'setAddDataSuccessRequest',
            'setModifySuccessRequest',
        ]),
        ...mapActions('page', [
            'dataPerPageChangeRequest',
            'pageChangeRequest',
        ]),
        ...mapActions('modal', [
            'showModalRequest',
        ]),
        fetchData() {
            //fetchData에서 하는 일 : 현재 페이지, 페이지 옵션 던져서 데이터 받아오기 -> state 변경
            let option = {
                currentPageIndex : this.currentPageIndex,
                pageOption : this.pageOption
            }
            this.initMovieDataRequest();
            this.setDataRequest(option);
        },
        onclickDelete(id) {
            this.deleteDataRequest(id);
            alert('삭제 되었습니다.');
        },
        onClickModify(movieId) {
            this.movieId = movieId;
            //modalVisible state 바꾸고 movieId 전달하는 액션 부르기
            this.showModalRequest(movieId);
        },
    }
}
</script>