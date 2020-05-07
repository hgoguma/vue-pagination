<template>
    <b-container class="mb-2" style="margin-top: 50px;">
        <p style="text-align:center;">페이지 옵션 설정</p>
        <b-row cols="5" cols-md="5" cols-xl="5">
            <b-col>
                <span style="text-align:center;">페이지 범위</span>
            </b-col>
            <b-col>
                <b-form-input type="text" v-model="pageOption.pageCount" @keydown="checkValue($event)"></b-form-input>
                <!-- <b-form-select v-model="pageOption.pageCount" :options="pageCountOption" size="sm"></b-form-select> -->
            </b-col>
            <b-col>
                <span style="text-align:center;">한 페이지당 보여줄 데이터 개수</span>
            </b-col>
            <b-col>
                <b-form-input type="text" v-model="pageOption.dataPerPage" @keydown="checkValue($event)"></b-form-input>
                <!-- <b-form-select v-model="pageOption.dataPerPage" :options="dataPerPageOption" size="sm"></b-form-select> -->
            </b-col>
            <b-col>
                <b-button variant="outline-primary" @click="changePageOption()">클릭</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    created() {
        //this.$store.dispatch('page/setPageOptionRequest', this.pageOption);
    },
    // beforeUpdate() {
    //     this.$store.dispatch('page/setPageOptionRequest', this.pageOption);
    // },
    data() {
        return {
            // pageOption : {
            //     pageCount : null,
            //     dataPerPage : null
            // },
            // pageCountOption : [ //한 화면에 몇 페이지씩 보여줄 건지
            //     { value: 3, text: '3' },
            //     { value: 5, text: '5' },
            //     { value: 10, text: '10' },
            // ],
            // dataPerPageOption : [
            //     { value: 5, text: '5' },
            //     { value: 10, text: '10' },
            //     { value: 15, text: '15' },
            //     { value: 20, text: '20' },
            // ],
        }
    },
    computed : {
        pageOption : {
            get() {
                return this.$store.getters['page/getPageOption']
            },
            set(newVal) {
                return this.$store.dispatch('page/setPageOptionRequest', newVal);
            }
        },
    },
    methods : {
        changePageOption() {
            //공백 처리하기!
            if(!this.pageOption.pageCount || !this.pageOption.dataPerPage) {
                alert('숫자를 입력해주세요');
                return;
            }
            this.$store.dispatch('page/setPageOptionRequest', this.pageOption); //pageOption state 바꾸기
            this.$emit('renderingPage');
        },
        checkValue($event) {
            //숫자 입력만 하게 만들기
            if(($event.keyCode < 48 || $event.keyCode > 57) && $event.keyCode !== 8) {
                $event.preventDefault();
            }
        }
    }
}
</script>