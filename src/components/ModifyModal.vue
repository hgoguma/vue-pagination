<template>
    <b-modal
        title="수정"
        v-model="modalVisible"
        ok-title="수정"
        cancel-title="취소"
        @ok="submitModalForm()"
    >
        <form>
            <b-form-group label="한글 타이틀" label-for="title">
                <b-form-input v-model="singleData.title" /> 
            </b-form-group>
            <b-form-group label="영어 타이틀" label-for="original_title">
                <b-form-input v-model="singleData.original_title" />
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
import { mapState } from 'vuex';
const { modifyData } = require('../js/data.js');

export default {
    computed : {
        ...mapState('movieData', {
            singleData : state => state.singleData,
            movieId : state => state.movieId,
        }),
        modalVisible : {
            get() { return this.$store.state.modal.modalVisible }, 
            set(value) { return this.$store.commit('modal/modalVisible', value)}
        }
    },
    methods : {
        submitModalForm() {
            //공백 처리
            if(!this.singleData.title || !this.singleData.original_title) {
                alert('입력해주세요');
                return;
            }
            let result = modifyData(this.singleData);
            if(result == "success") {
                alert('수정 되었습니다.');
                this.$store.dispatch('modal/closeModal');
                this.$emit('renderingPage');
            }
            
            //this.$store.dispatch('movieData/modifyDataAction', this.singleData)
            
        },
    }
}
</script>