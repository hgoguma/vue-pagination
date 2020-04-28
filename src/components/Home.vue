<template>
    <div>
        <!--Header-->
        <Header />
         <!--Pagination Option -->
        <PageOption @setPageOption="setPageOption" />
          

        <Form  v-if="this.pageOption != null" @submitForm="submitForm"/>

        <!--List-->
        <List :movieData="movieData" @onclickDelete="onclickDelete" />
       
        <!-- Pagination -->
        <Pagination 
          v-if="this.pageOption != null"  
          :totalData="this.totalData" 
          :pageOption="this.pageOption" 
          @changePage="changePage"
        />
    </div>
</template>

<script>
import Header from './Header.vue'
import PageOption from './PageOption.vue'
import Form from './Form.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'

const { fetchData, saveData } = require('../js/data.js');



export default {
  components: {
    Header,
    PageOption,
    Form,
    List,
    Pagination
  },
  data() {
    return {
        totalData : 0, //총 데이터 개수
        pageOption : null,
        movieData : [],
    }
  },
  methods : {
      fetchDataFromJs(currentPageIndex) {
        console.log('fetchDataFromJs');
        //기존 데이터 비우기
        this.movieData = [];
        let data = fetchData(currentPageIndex, this.pageOption);
        this.movieData = data.results;
        this.totalData = data.totalData;
      },
      changePage(currentPageIndex) {
        this.fetchDataFromJs(currentPageIndex);
      },
      setPageOption(pageOption) {
        console.log('setPageOption');
        this.pageOption = pageOption;
        this.fetchDataFromJs(1);
      },
      submitForm(formData) {
        saveData(formData);
        alert('등록되었습니다.');
        this.fetchDataFromJs(1);
      },
      onclickDelete() {
        this.fetchDataFromJs(1);
      },
  }
}
</script>
