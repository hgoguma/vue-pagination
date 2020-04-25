<template>
    <div>
        <!--Header-->
        <Header></Header>

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
        movieData : [],
    }
  },
  created() {
    this.fetchDataFromJs();
    //this.setList();
  },
  methods : {
      fetchDataFromJs(pageIndex = 1) {
        //pagination 데이터 가져오기
        let data = fetchData(pageIndex);
        this.pagination = data.pagination;
        this.movieData = data.results;
        let poster_path = data.results.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path);
        this.movieData.poster_path = poster_path;
      },
      changePage(pageIndex) {
        console.log('부모 changePage!', pageIndex);
        //기존 데이터 비우기
        this.movieData = [];
        this.fetchDataFromJs(pageIndex);
      }
    
  }
}
</script>
