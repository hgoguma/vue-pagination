<template>
    <b-modal
        title="수정"
        v-model="showModal"
        ok-title="수정"
        cancel-title="취소"
        @ok="submitModalForm($event)"
    >
        <form>
            <b-form-group label="한글 타이틀" label-for="title">
                <b-form-input v-model="modifyData.title" /> 
            </b-form-group>
            <b-form-group label="영어 타이틀" label-for="original_title">
                <b-form-input v-model="modifyData.original_title" />
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
import { eventBus } from '../main.js'
const { getMovieData, modifyData } = require('../js/data.js');

export default {
    data() {
        return {
            modifyData : {},
            showModal : false,
        }
    },
    created() {
        eventBus.$on('openModal', () => { 
            this.showModal = true
        });
        eventBus.$on('modifyData', (movieId) => {
            this.setMovieData(movieId);
        });
    },
    methods : {
        setMovieData(movieId) {
            this.modifyData = getMovieData(movieId);
            return;
        },
        submitModalForm($event) {
            $event.preventDefault();
            //공백 처리
            if(!this.modifyData.title || !this.modifyData.original_title) {
                alert('입력해주세요');
                return;
            }
            modifyData(this.modifyData);
            alert('수정 되었습니다.');
            //창 닫기
            this.showModal = false;
            //부모한테 전달
            this.$emit('modified');
        },
    }
}
</script>