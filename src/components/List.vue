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
                    <b-button @click="onClickModify(data)"  variant="light">수정</b-button>
                </b-card>
            </b-col>
        </b-row>
        <!--수정 모달창 -->
        <b-modal
        title="수정"
        v-model="showModifyModal"
        ok-title="수정"
        cancel-title="취소"
        @ok="submitModalForm($event)"
        >
            <form>
                <b-form-group
                    label="한글 타이틀"
                    label-for="title"
                >
                    <b-form-input id="title" required :v-model="this.dataForModify.title"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="영어 타이틀"
                    label-for="original_title"
                >
                    <b-form-input id="original_title" required :v-model="this.dataForModify.original_title" ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <!-- <ModifyModal :show="showModifyModal" :dataForModify="dataForModify" @modifyForm="modifyForm" /> -->
    </b-container>
</template>

<script>
//import ModifyModal from './ModifyModal.vue'
const { deleteData } = require('../js/data.js');

export default {
    // components : {
    //     ModifyModal,
    // },
    props: {
        movieData : {
            required : true,
            type : Array
        }
    },
    data () {
        return {
            showModifyModal : false,
            dataForModify : {},
        }
    },
    methods : {
        onclickDelete(id) {
            deleteData(id);
            alert('삭제 되었습니다.');
            this.$emit('onclickDelete');
        },
        onClickModify(data) {
            this.showModifyModal = true;
            this.dataForModify = data;
        },
        submitModalForm($event) {
            console.log('submitModalForm!!');
            $event.preventDefault();
            this.$emit('modifyForm', this.dataForModify);
            //수정하러 가기,,,

            //수정 되면 창 닫아주기!
        }
    }
    
}
</script>