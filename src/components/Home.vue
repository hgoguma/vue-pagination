<template>
    <div>
        <!--Header-->
        <Header />

        <!-- 페이지 옵션 -->
        <PageOption @renderingPage="renderingPage"  />
          
        <!-- 추가 -->
        <Form />

        <!-- 영화 리스트 -->
        <List />
        
        <!-- 페이징 처리 -->
        <Pagination @renderingPage="renderingPage" />

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
  created() {
    this.renderingPage();
  },
  computed: {
    currentPageIndex : {
        get() { return this.$store.state.page.currentPageIndex },
        set(value) {  return this.$store.commit('page/currentPageIndex', value) },
    },
    pageOption: {
      get() {
        return this.$store.getters['page/getPageOption']
      },
      set(newVal) {
        return this.$store.dispatch('page/setPageOptionRequest', newVal);
      }
    },
  },
  methods: {
    //API 호출해서 데이터 가져오기
    fetchData() {
      let option = {
        currentPageIndex : this.currentPageIndex,
        pageOption : this.pageOption
      }
      this.$store.dispatch('movieData/setDataRequest', option);
    },
    //페이징처리
    setPaginationAction() {
        let payload = {
            currentPageIndex : this.currentPageIndex,
            pageOption : this.pageOption
        }
        this.$store.dispatch('page/chagePageAndSetPagination', payload);
    },
    //데이터 가져오고 페이징 처리
    renderingPage() {
      this.fetchData();
      this.setPaginationAction();
    },
  }
}
</script>
