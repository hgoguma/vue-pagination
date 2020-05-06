<template>
    <div>
        <!--Header-->
        <Header />
         <!-- Pagination Option @changePageOption="changePageOption"-->
        <PageOption  />
          
        <!-- Form @submitForm="submitForm" -->
        <Form />

        <!-- List -->
        <List />
        
        <!-- Pagination @changePage="changePage" -->
        <Pagination 
          
        />

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

//const { fetchData } = require('../js/data.js');

export default {
  components: {
    Header,
    PageOption,
    Form,
    List,
    Pagination,
    ModifyModal,
  },
  // methods : {
  //     changePageOption() {
  //       console.log('페이지 옵션 바꾸자!');
  //       this.setPageOption();
  //       this.fetchData();
  //     },
  //     setPageOption() {
  //       console.log('setPageOption 함수!');
  //       //console.log('페이지 옵션?', this.pageOption);
  //       //넘어오는 파라미터가 없으면 default 파라미터 보내기 / 있으면 파라미터로 넘기기
  //       //pageOption == null || undefined ? pageOption = this.pageOption : pageOption;
  //       this.$store.dispatch('pageOption/setPageOption', this.pageOption);
  //     },
  //     fetchData() {
  //       //fetchData에서 하는 일 : 현재 페이지, 페이지 옵션 던져서 데이터 받아오기 -> state 변경
  //       let option = {
  //         currentPageIndex : this.currentPageIndex,
  //         pageOption : this.pageOption
  //       }
  //       this.$store.commit('movieData/initMovieData'); //state 초기화
  //       this.$store.dispatch('movieData/setData', option); //데이터 가져오기
  //     },
  // }
}
</script>
