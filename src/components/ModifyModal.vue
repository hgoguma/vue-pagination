<template>
    <b-modal
        title="수정"
        v-model="show"
        ok-title="수정"
        cancel-title="취소"
        @ok="submitModalForm($event)"
    >
        <form>
            <b-form-group
                label="한글 타이틀"
                label-for="title"
            >
                <b-form-input id="title" required :value="this.modifiedData.title" ></b-form-input>
            </b-form-group>
            <b-form-group
                label="영어 타이틀"
                label-for="original_title"
            >
                <b-form-input id="original_title" required :value="this.modifiedData.original_title" ></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
export default {
    props : {
        show : {
            required : true,
            type : Boolean
        },
        dataForModify : {
            required : true,
            type : Object
        },
    },
    data() {
        return {
            modifiedData : this.dataForModify
            
        }
    },
    methods : {
        submitModalForm($event) {
            console.log('submitModalForm!!');
            $event.preventDefault();
            this.$emit('modifyForm', this.modifiedData);
            //수정하러 가기,,,

            //수정 되면 창 닫아주기!
        }
    }
}
</script>