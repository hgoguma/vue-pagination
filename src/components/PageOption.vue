<template>
    <b-container class="mb-2" style="margin-top: 50px;">
        <p style="text-align:center;">페이지 옵션 설정</p>
        <b-row cols="5" cols-md="5" cols-xl="5">
            <b-col>
                <span style="text-align:center;">페이지 범위</span>
            </b-col>
            <b-col>
                <b-form-select v-model="pageOption.pageCount" :options="pageCountOption" size="sm"></b-form-select>
            </b-col>
            <b-col>
                <span style="text-align:center;">한 페이지당 보여줄 데이터 개수</span>
            </b-col>
            <b-col>
                <b-form-select v-model="pageOption.dataPerPage" :options="dataPerPageOption" size="sm"></b-form-select>
            </b-col>
            <b-col>
                <b-button variant="outline-primary" @click="setPageOption()">클릭</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


export default {
    data() {
        return {
            pageOption : {
                pageCount : null,
                dataPerPage : null
            },
            pageCountOption : [ //한 화면에 몇 페이지씩 보여줄 건지
                { value: 3, text: '3' },
                { value: 5, text: '5' },
                { value: 10, text: '10' },
            ],
            dataPerPageOption : [
                { value: 5, text: '5' },
                { value: 10, text: '10' },
                { value: 15, text: '15' },
                { value: 20, text: '20' },
            ],
        }
    },
    methods : {
        setPageOption() {
            this.$emit('setPageOption', this.pageOption);
        }
    }
}
</script>