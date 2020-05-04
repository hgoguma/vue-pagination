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
import { eventBus } from '../main.js'
import { mapState } from 'vuex' 
const { deleteData } = require('../js/data.js');

export default {
    // props: {
    //     movieData : {
    //         required : true,
    //         type : Array
    //     }
    // },
    data () {
        return {
            movieId : '',
        }
    },
    computed: {
        ...mapState({
            movieData : state => state.movieData.movieData,
        })
    },
    methods: {
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