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
import { mapGetters, mapState } from 'vuex';

export default {
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
    created() {
        //this.setPageOption();
    },
    computed : {
        ...mapGetters({
            pageOption : 'page/getPageOption'
        }),
        ...mapState('page', {
            dataPerPageChanged : state => state.dataPerPageChanged,
            pageCountChanged : state => state.pageCountChanged,
        }),
    },
    methods : {
        setPageOption() {
            this.$store.commit('page/setPageOption', this.pageOption); //pageOption state 변경
        },
        changePageOption() {
            //공백 처리하기!
            if(!this.pageOption.pageCount || !this.pageOption.dataPerPage) {
                alert('숫자를 입력해주세요');
                return;
            }
            //pageOption 바뀌었음을 알리기
            this.$store.commit('page/dataPerPageChanged', true);
            this.$store.commit('page/pageCountChanged', true);
            //현재 페이지 1로 바꾸기
            this.$store.commit('page/initCurrentPageIndex');
            this.setPageOption();
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