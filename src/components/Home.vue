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
          :total-data="this.totalData" 
          :page-option="this.pageOption" 
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
import { mapState, mapActions } from 'vuex' 

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
        totalData : 0, //총 데이터 개수
        pageOption : null,
        //movieData : [],
        defaultOption : {
          pageCount : 5,
          dataPerPage : 10,
        },
    }
  },
  created() {
    this.pageOption = this.defaultOption;
    //this.fetchDataFromJs(1);
    let payload = {
      currentPageIndex : 1,
      pageOption : this.pageOption
    }
    this.setData(payload);
  },
  computed : {
    ...mapState({
      movieData : state => state.movieData.movieData,
    })
    // movieDataFromStore : {
    //   get : function() {
    //     return this.movieData === this.$store.state.movieData.data
    //   },
    //   set : function() {
    //     console.log('set!!')
    //     this.$store.dispatch('movieData/setData', 1, this.pageOption);
    //   }
    // }
  },
  methods : {
      ...mapActions({
        setData : 'movieData/setData'
      }),
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
      setPageOption(pageOption) {
        this.pageOption = pageOption;
        this.fetchDataFromJs(1);
      },
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
