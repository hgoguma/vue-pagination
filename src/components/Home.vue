<template>
    <div>
        <!--Header-->
        <Header />
         <!--Pagination Option -->
        <PageOption @setPageOption="setPageOption" />

        <!--List-->
        <List :movieData="movieData" />
       
        <!-- Pagination -->
        <Pagination v-if="this.pageOption != null"  :totalData="this.totalData" :pageOption="this.pageOption" @changePage="changePage" />
    </div>
</template>

<script>
import Header from './Header.vue'
import PageOption from './PageOption.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'

import fetchData from "../js/data.js";


export default {
  components: {
    Header,
    PageOption,
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
        //기존 데이터 비우기
        this.movieData = [];
        let data = fetchData(currentPageIndex, this.pageOption);
        this.totalData = data.totalData;
        let poster_path = data.results.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path);
        data.results.poster_path = poster_path;
        this.movieData = data.results;
      },
      changePage(currentPageIndex) {
        this.fetchDataFromJs(currentPageIndex);
      },
      setPageOption(pageOption) {
        this.pageOption = pageOption;
        this.fetchDataFromJs(1);
      }
  }
}
</script>
