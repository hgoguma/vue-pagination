<template>
    <b-container class="mb-2">
        <b-row cols="5" cols-md="4" cols-xl="5">
            <b-col md="3" v-for="(data) in movieData" :key="data.id">
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
export default {
    data () {
        return {
            movieId : '',
        }
    },
    computed: {
        currentPageIndex : {
            get() { return this.$store.state.page.currentPageIndex },
            set(value) {  return this.$store.commit('page/currentPageIndex', value) },
        },
        movieData : {
            get() { return this.$store.getters['movieData/getMovieData'] },
        },
        pageOption : {
            get() {
                return this.$store.getters['page/getPageOption']
            },
            set(newVal) {
                return this.$store.dispatch('page/setPageOptionRequest', newVal);
            }
        },
    },
    methods: {
        onclickDelete(id) {
            this.$store.dispatch('movieData/deleteDataRequest', id);
            alert('삭제 되었습니다.');
        },
        onClickModify(movieId) {
            this.movieId = movieId;
            //modalVisible state 바꾸기
            this.$store.dispatch('modal/showModalRequest', movieId);
        },
    }
}
</script>