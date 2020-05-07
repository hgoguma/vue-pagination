<template>
    <b-container class="mb-2" style="margin-top: 50px;">
        <p style="text-align:center;">새 영화 추가</p>
        <b-form inline>
            <!-- <b-img src="https://image.tmdb.org/t/p/w500/zXfQcdTx0jxbH5Atpwjvb5z5VjE.jpg" style="width:196px; height:294px;" fluid alt="image"/> -->
            <b-input v-model="form.title" class="mb-2 mr-sm-2 mb-sm-0" placeholder="한국어 타이틀" />
            <b-input v-model="form.original_title" class="mb-2 mr-sm-2 mb-sm-0" placeholder="영어 타이틀" />
            <b-button variant="primary" @click.prevent="submitForm">Save</b-button>
        </b-form>
    </b-container>
</template>
<script>
const { saveData } = require('../js/data.js');

export default {
    data() {
        return {
            form: {
                title: '',
                original_title: '',
            },
        }
    },
    methods: {
        submitForm() {
            //공백 처리
            if(!this.form.title || !this.form.original_title) {
                alert('입력해주세요');
                return;
            }
            //this.$store.dispatch('movieData/addData', this.form);
            let result = saveData(this.form);
            if(result.result == "success" && result.id) {
                this.$emit('renderingPage');
            }
            this.form = {};
        }
    }
}
</script>