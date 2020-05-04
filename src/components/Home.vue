<template>
    <div>
        <!--Header-->
        <Header />
         <!-- Pagination Option -->
        <PageOption @setPageOption="setPageOption" />
          
        <!-- Form -->
        <!-- <Form @submitForm="submitForm"/> -->

        <!-- List -->
        <List :movieData="movieData" @onclickDelete="onclickDelete" />
        
        <!-- Pagination -->
        <Pagination 
          :totalData="totalData"
          :pageOption="pageOption"
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

//const { fetchData } = require('../js/data.js');

const defaultOption = {
  pageCount : 5,
  dataPerPage : 10,
};

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
        options : {
          currentPageIndex : 0,
          pageOption : {}
        },
    }
  },
  created() {
    this.options.currentPageIndex = 1;
    this.options.pageOption = defaultOption;
    this.fetchData(this.options);
  },
  computed : {
    totalData : {
      get() { return this.$store.state.movieData.totalData }
    },
    movieData : {
      get() { return this.$store.state.movieData.movieData }
    },
    pageOption : {
      get() { return this.$store.state.pageOption.pageOption }
    }
  },
  methods : {
      setData() {
        this.$store.dispatch('movieData/setData', this.options);
      },
      setPageOption(pageOption) {
        //넘어오는 파라미터가 없으면 default 파라미터 보내기 / 있으면 파라미터로 넘기기
        //pageOption == null || undefined ? pageOption = this.options.pageOption : pageOption;
        this.$store.dispatch('pageOption/setPageOption', pageOption);
        //this.$store.dispatch('movieData/setData', pageOption);
        this.options.currentPageIndex = 1;
        this.options.pageOption = pageOption;
        this.fetchData(this.options);
      },
      fetchData(options) {
        this.$store.commit('movieData/initMovieData');
        this.$store.dispatch('movieData/setData', options);
      },
      fetchDataFromJs() {
        //기존 데이터 비우기
        //this.movieData = [];
        //let data = fetchData(currentPageIndex, this.pageOption);
        //this.movieData = data.results;
        //this.totalData = data.totalData;
      },
      changePage(currentPageIndex) {
        this.options.currentPageIndex = currentPageIndex;
        this.fetchData(this.options);
        //this.fetchDataFromJs(currentPageIndex);
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
