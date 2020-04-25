<template>
    <div>
        <!--Header-->
        <Header></Header>

        <!--List-->
        <!-- 자식 컴포넌트한테 전달하기 -->
        <List id="my-list" :movieData="movieData" />


        <b-container class="text-center">
            <!-- <Pagination></Pagination> -->
            <!-- <b-pagination
            v-model="currentPageIndex"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            aria-controls="my-list"
            />
            <p class="mt-3">currentPageIndex: {{ currentPageIndex }}</p>
            <p class="mt-3">Total-rows: {{ rows }}</p> -->
            <div class="overflow-auto" v-bind="currentPageIndex">
                <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
                    <!-- 첫페이지로, 이전 버튼-->
                    <li aria-hidden="true" class="page-item disabled">
                        <span aria-label="Go to first page" aria-controls="my-list" aria-disabled="true" class="page-link">«</span>
                    </li>
                    <li aria-hidden="true" class="page-item disabled">
                        <span aria-label="Go to previous page" aria-controls="my-list" aria-disabled="true" class="page-link">‹</span>
                    </li>

                    <!--페이지 보여주기-->
                    <div v-for="(page, index) in pageNum" v-bind:key="index">
                        <li class="page-item" :class="page+1 === currentPageIndex? 'active' : 'none'">
                            <button type="button" aria-controls="my-list" aria-checked="true" aria-posinset="1" aria-setsize="7" tabindex="0" class="page-link" @click="changePage(page+1)">{{page + 1}}</button>
                        </li>
                    </div>
                    
                    <li class="page-item">
                        <button type="button" tabindex="-1" aria-label="Go to next page" aria-controls="my-list" class="page-link">›</button>
                    </li>
                    <li class="page-item">
                        <button type="button" tabindex="-1" aria-label="Go to last page" aria-controls="my-list" class="page-link">»</button>
                    </li>
                </ul>
            </div>
        </b-container>
    </div>
</template>

<script>
import Header from './Header.vue'
import List from './List.vue'
//import Pagination from './Pagination.vue'

import fetchData from "../js/data.js";


export default {
  components: {
    Header,
    List,
    //Pagination
  },
  data() {
    return {
        currentPageIndex : '',
        movieData : [],
        totalPage : '', //총 페이지 수
        totalData : '', //총 가져올 데이터 개수
        listCount : 10,
        pagination : '',
        pageNum : [],
    }
  },
  created() {
    //let pageIndex = 1; //페이지 index 첫번째로 셋팅
    //this.setList();
    //this.currentPageIndex = 1;
    this.setPagination();
    this.setList();
    //첫번째 페이지로 index setting
    this.currentPageIndex = 1;
  },
  watch : {
    //   currentPageIndex : function(pageIndex) {
    //       if(pageIndex === 1) {
    //           return;
    //       }

    //       //기존 데이터 지우기
    //       this.movieData = [];
    //       //페이지 index 변경시 다시 데이터 가져오기
    //       //console.log('fetData again!');
    //       this.setList(pageIndex);
    //       //console.log('after fetch', this.movieData);
    //       //console.log('현재 인덱스', this.currentPageIndex);

    //       //다시 뿌려주기
    //   }
  },
  methods : {
      setPagination(pageIndex = 1) {
        let data = fetchData(pageIndex);
        this.pagination = data.pagination;
        //총 페이지 개수 구하기
        this.totalPage = Math.floor(this.pagination.total / this.pagination.per_page);
        if(this.pagination.total % this.pagination.per_page > 0 ){
            this.totalPage++;
        }
        for(var i = 0; i <this.totalPage; i++) {
            this.pageNum.push(i);
        }
        
      },
      setList(pageIndex = 1) { //파라미터 넘기지 않으면 default로 pageIndex = 1로 설정
          let data = fetchData(pageIndex); //데이터 가져오기(pageIndex 전달)
          this.currentPageIndex = data.pageIndex;
          this.setImagePath(data.results); //이미지 경로 변경해주기
          data.results.map(element => this.movieData.push(element));
      },
      setImagePath(data) {
          data.map(element => element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path);
      },
      changePage(pageIndex) {
          this.currentPageIndex = pageIndex;
      }
  }
}
</script>
