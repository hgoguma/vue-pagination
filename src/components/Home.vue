<template>
    <div>
        <!--Header-->
        <Header />

        <!-- 페이지 옵션 -->
        <PageOption  />
          
        <!-- 추가 -->
        <Form />

        <!-- 영화 리스트 -->
        <List />
        
        <!-- 페이징 처리 -->
        <Pagination />

        <!-- 수정 모달창 --> 
        <ModifyModal />
    </div>
</template>

<script>
import Header from './Header.vue'
import PageOption from './PageOption.vue'
import Form from './Form.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'
import ModifyModal from './ModifyModal.vue'

export default {
  components: {
    Header,
    PageOption,
    Form,
    List,
    Pagination,
    ModifyModal,
  },
}
</script>
