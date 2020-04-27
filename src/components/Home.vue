<template>
    <div>
        <!--Header-->
        <Header />

        <!--List-->
        <List id="my-list" :movieData="movieData" />

        <!-- Pagination -->
        <b-container class="text-center">
            <Pagination :pagination="pagination" @changePage="changePage" />
        </b-container>
    </div>
</template>

<script>
import Header from './Header.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'

import fetchData from "../js/data.js";


export default {
  components: {
    Header,
    List,
    Pagination
  },
  data() {
    return {
        pagination : [],
        pageOption : {
          pageCount : 5,
          dataPerPage : 5
        },
        movieData : [],
    }
  },
  created() {
    this.fetchDataFromJs(1);
  },
  methods : {
      fetchDataFromJs(currentPageIndex) {
        //기존 데이터 비우기
        this.movieData = [];
        let data = fetchData(currentPageIndex, this.pageOption);
        this.pagination = data.pagination;
        let poster_path = data.results.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path); //배열
        data.results.poster_path = poster_path;
        this.movieData = data.results;
      },
      changePage(currentPageIndex) {        
        this.fetchDataFromJs(currentPageIndex);
      },
  }
}
</script>
