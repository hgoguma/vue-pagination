<template>
    <div class="overflow-auto" v-bind="pagination">
        <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
            <!-- 첫페이지로 버튼-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="firstPage()" :disabled="this.currentPageIndex == 1? true : false">«</button>
            </li>

            <!-- 이전 페이지 버튼-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="prevPage()" :disabled="this.currentPageIndex == 1? true : false">‹</button>
            </li>

            <!--이전 페이지 범위로 이동 -->
            <div v-if="hasPrevPage">
                <li class="page-item">
                    <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="loadPrevPage()">...</button>
                </li>
            </div>

            <!--페이지 범위 보여주기-->
            <div v-for="(pageIndex, index) in displayPageArray" v-bind:key="index">
                <li class="page-item" :class="{ 'active' : pageIndex === currentPageIndex }">
                    <button type="button" aria-controls="my-list" aria-checked="true" tabindex="0" class="page-link" @click="changePage(pageIndex)">{{pageIndex}}</button>
                </li>
            </div>

            <!-- 앞 페이지 범위로 이동 -->
            <div v-if="hasMorePage">
                <li class="page-item">
                    <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="loadMorePage()">...</button>
                </li>
            </div>

             <!-- 다음 페이지-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="nextPage()" :disabled="this.currentPageIndex == this.pagination.totalPage? true : false">›</button>
            </li>

             <!-- 맨 마지막 페이지로 이동-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="lastPage()" :disabled="this.currentPageIndex == this.pagination.totalPage? true : false">»</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['pagination'],
    data() {
        return {
            currentPageIndex : 1,
            totalPage : 0,
            displayPageArray : [], //실제 보여주는 페이지 범위
            hasMorePage : false, //더보기 버튼 여부
            hasPrevPage : false, //이전 더보기 버튼 여부
            pageRange : [], //[startPage, endPage] 배열
        }
    },
    watch : {
        displayPageArray(newVal, oldVal) {
            //이전 페이지로 바꾸는 버튼 활성화
            if(oldVal.length != 0 && newVal.length) {
                this.hasPrevPage = true;
            }
            if(newVal[0] === 1) {
                this.hasPrevPage = false;
            }
        },
    },
    created(){
        this.getTotalPage(); //총 페이지 개수 구하기
        this.setPagination(this.currentPageIndex);
        this.setPageRange(this.currentPageIndex);
    },
    methods: {
        //페이징 범위 처리하는 함수
        setPagination(startPage) {
            this.displayPageArray = []; 
            for(let i = 0; i < this.pagination.pageOption.pageCount; i++) {
                let pageIndex = startPage + i;
                if(pageIndex > this.totalPage) {
                    break;
                }
                this.displayPageArray.push(pageIndex);
            }
            if(this.totalPage > this.displayPageArray[this.displayPageArray.length -1 ]) {
                this.hasMorePage = true;
            }
            if(this.totalPage === this.displayPageArray[this.displayPageArray.length -1 ]) {
                this.hasMorePage = false;
            }
        },
        //startPage, endPage 구해서 pageRange 배열 만드는 함수
        setPageRange(currentPageIndex) {
            this.pageRange = [];
            let endPage = (Math.ceil(currentPageIndex / this.pagination.pageOption.pageCount) * this.pagination.pageOption.pageCount);
            let startPage = (endPage - this.pagination.pageOption.pageCount)+1;
            if(endPage > this.totalPage) {
                endPage = this.totalPage;
            }
            if(this.totalPage < 1 || this.totalPage == 1) {
                startPage = endPage;
            }
            this.pageRange.push(startPage, endPage);
        },
        chagePageAndSetPagination(currentPageIndex) {
            this.$emit('changePage', currentPageIndex);
            this.setPageRange(currentPageIndex);
            this.setPagination(this.pageRange[0]);
        },
        getTotalPage() {
            this.totalPage = Math.ceil(this.pagination.totalData/this.pagination.pageOption.dataPerPage);
        },
        //click 이벤트 함수
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        firstPage() {
            this.currentPageIndex = 1;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        prevPage() {
            this.currentPageIndex--;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        nextPage() {
            this.currentPageIndex++;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        lastPage() {
            this.currentPageIndex = this.totalPage;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        loadMorePage() {
            this.currentPageIndex = this.pageRange[1] + 1;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
        loadPrevPage() {
            this.currentPageIndex = this.pageRange[0] - this.pagination.pageOption.pageCount;
            this.chagePageAndSetPagination(this.currentPageIndex);
        },
    }
}
</script>