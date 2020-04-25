<template>
    <div>
        <!--Header-->
        <Header></Header>

        <!--List-->
        <!-- 자식 컴포넌트한테 전달하기 -->
        <List id="my-list" :movieData="movieData" />


        <b-container class="text-center">
            <Pagination :pagination="pagination" @changePage="changePage" />
            <!-- <b-pagination
            v-model="currentPageIndex"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            aria-controls="my-list"
            />
            <p class="mt-3">currentPageIndex: {{ currentPageIndex }}</p>
            <p class="mt-3">Total-rows: {{ rows }}</p> -->
            
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
    this.setList();
    //첫번째 페이지로 index setting
    //this.currentPageIndex = 1;
  },
  methods : {
      fetchDataFromJs() {
        //pagination 데이터 가져오기
        let data = fetchData();
        this.pagination = data.pagination;
      },
      setList(pageIndex = 1) { //파라미터 넘기지 않으면 default로 pageIndex = 1로 설정
        let data = fetchData(pageIndex); //데이터 가져오기(pageIndex 전달)
        this.setImagePath(data.results); //이미지 경로 변경해주기
        data.results.map(element => this.movieData.push(element));
      },
      setImagePath(data) {
        data.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path);
      },
      changePage(pageIndex) {
        //console.log('부모 changePage!', pageIndex);
        //기존 데이터 비우기
        this.movieData = [];
        this.setList(pageIndex);
      }
    
  }
}
</script>
