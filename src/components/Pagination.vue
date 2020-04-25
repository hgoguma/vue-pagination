<template>
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
            <div v-for="(pageIndex, index) in pageNum" v-bind:key="index">
                <li class="page-item" :class="{ 'active' : pageIndex === currentPageIndex }">
                    <button type="button" aria-controls="my-list" aria-checked="true" aria-posinset="1" aria-setsize="7" tabindex="0" class="page-link" @click="changePage(pageIndex)">{{pageIndex}}</button>
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
</template>
<script>
export default {
    props: ['pagination'],
    data() {
        return {
            currentPageIndex : '',
            totalPage : '', //총 페이지 수
            listCount : 10,
            pageNum : [],
        }
    },
    created(){
        this.setPagination();
    },
    methods: {
        setPagination() {
            //총 페이지 개수 구하기
            this.totalPage = Math.floor(this.pagination.total / this.pagination.per_page);
            if(this.pagination.total % this.pagination.per_page > 0 ){
                this.totalPage++;
            }
            //페이지 개수 만큼 배열 만들기 -> for 문 돌면서 li 태그 만듦
            for(var i = 0; i <this.totalPage; i++) {
                this.pageNum.push(i + 1);
            }
        },
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex; //현재 보고 있는 페이지 바꿔주기
            this.$emit('changePage', pageIndex);            
      },
    }
}
</script>