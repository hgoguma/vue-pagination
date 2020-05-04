<template>
    <div>
        <!--Header-->
        <Header />
         <!-- Pagination Option -->
        <PageOption @setPageOption="setPageOption" />
          
        <!-- Form -->
        <!-- <Form @submitForm="submitForm"/> -->

        <!-- List -->
        <List @onclickDelete="onclickDelete" />
        
        <!-- Pagination -->
        <Pagination 
          :page-option="this.payload.pageOption"
          @changePage="changePage"
        />

        <!-- 수정 모달창 --> 
        <ModifyModal @modified="modified" />
    </div>
</template>

<script>
import Header from './Header.vue'
import PageOption from './PageOption.vue'
//import Form from './Form.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'
import ModifyModal from './ModifyModal.vue'

const { fetchData } = require('../js/data.js');

export default {
  components: {
    Header,
    PageOption,
    //Form,
    List,
    Pagination,
    ModifyModal,
  },
  data() {
    return {
        payload : {
          currentPageIndex : 0,
          pageOption : {}
        },
        defaultOption : {
          pageCount : 5,
          dataPerPage : 10,
        },
    }
  },
  created() {
    this.payload.currentPageIndex = 1;
    this.payload.pageOption = this.defaultOption;
    this.setData();
    //console.log('setPageOption 하자!');
    //console.log(this.payload.pageOption);
    this.setPageOption();
  },
  computed : {

    movieData : {
      get() { return this.$store.state.movieData.movieData }
    },
    totalData : {
      get() { return this.$store.state.movieData.totalData }
    },
    pageOption : {
      get() { return this.$store.state.pageOption.pageOption }
    }
  },
  methods : {
      setData() {
        this.$store.dispatch('movieData/setData', this.payload)
      },
      setPageOption() {
        this.$store.dispatch('pageOption/setPageOption', this.payload.pageOption)
      },
      
      fetchDataFromJs(currentPageIndex) {
        //기존 데이터 비우기
        //this.movieData = [];
        let data = fetchData(currentPageIndex, this.pageOption);
        //this.$store.dispatch('movieData/setData', currentPageIndex, this.pageOption);
        //this.movieData = data.results;
        this.totalData = data.totalData;
      },
      changePage(currentPageIndex) {
        this.fetchDataFromJs(currentPageIndex);
      },
      // setPageOption(pageOption) {
      //   this.pageOption = pageOption;
      //   this.fetchDataFromJs(1);
      // },
      // submitForm(formData) {
      //   saveData(formData);
      //   alert('등록되었습니다.');
      //   this.fetchDataFromJs(1);
      // },
      onclickDelete() {
        this.fetchDataFromJs(1);
      },
      modified() {
        this.fetchDataFromJs(1);
      }
  }
}
</script>
