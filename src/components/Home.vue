<template>
    <div>
        <!--Header-->
        <Header></Header>

        <!--List-->
        <List id="my-list" :movieData="movieData" />

        <!-- Pagination -->
        <b-container class="text-center">
            <Pagination :pagination="pagination" @changePage="changePage" @morePage="morePage" />
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
        pagination : [],
        pageOption : {
          pageCount : 5,
          dataPerPage : 10
        }
    }
  },
  created() {
    this.fetchDataFromJs(1);
  },
  methods : {
      fetchDataFromJs(currentPageIndex) {
        console.log('데이터 가져오기!');
        //pagination 데이터 가져오기
        let data = fetchData(currentPageIndex, this.pageOption);
        this.pagination = data.pagination;
        console.log('페이지네이션?', this.pagination);
        this.movieData = data.results;
        let poster_path = data.results.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path);
        this.movieData.poster_path = poster_path;
      },
      changePage(currentPageIndex) {
        console.log('changePage 부모!', currentPageIndex);
        //기존 데이터 비우기
        this.movieData = [];
        this.fetchDataFromJs(currentPageIndex);
      },
      morePage(nextPageIndex) {
        console.log('morePage!!!', nextPageIndex);
        this.fetchDataFromJs(nextPageIndex);
      }
    
  }
}
</script>
