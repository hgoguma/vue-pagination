<template>
    <div class="overflow-auto" v-bind="currentPageIndex">
        <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
            <!-- 첫페이지로 버튼-->
            <li class="page-item">
                <button type="button" tabindex="1" aria-controls="my-list" class="page-link" @click="firstPage(e)">«</button>
            </li>
            <!-- 이전 버튼-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="prevPage(e)">‹</button>
            </li>

            <!--이전 페이지 범위 이동 -->
            <div v-if="hasPrevPage">
                <li class="page-item">
                    <button type="button" tabindex="1" aria-controls="my-list" class="page-link" @click="loadPrevPage()">이전...</button>
                </li>
            </div>

            <!--페이지 범위 보여주기-->
            <div v-for="(pageIndex, index) in displayPageArray" v-bind:key="index">
                <li class="page-item" :class="{ 'active' : pageIndex === currentPageIndex }">
                    <button type="button" aria-controls="my-list" aria-checked="true" tabindex="0" class="page-link" @click="changePage(pageIndex)">{{pageIndex}}</button>
                </li>
            </div>

            <!-- 페이지 더 보여주기 -->
            <div v-if="hasMorePage">
                <li class="page-item">
                    <button type="button" tabindex="+1" aria-controls="my-list" class="page-link" @click="loadMorePage()">...</button>
                </li>
            </div>

            

            <li class="page-item">
                <button type="button" tabindex="+1" aria-controls="my-list" class="page-link" @click="nextPage(e)">›</button>
            </li>
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="lastPage(e)">»</button>
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
            pageCount : 5, //먼저 보여줄 페이지 개수
            dataPerPage : 10, //한 페이지당 보여줄 데이터 개수
            displayPageArray : [],
            hasMorePage : false,
            hasPrevPage : false,
            displayPageNumValArray : [],
        }
    },
    watch : {
        displayPageNum(newVal, oldVal) {
            console.log('setHasMorePage!');
            console.log('new', newVal);
            console.log('old', oldVal);
            //첫번째 페이지 범위가 아니고 && 새로 보여질 범위 보다 뿌릴 페이지 범위가 클 때
            if(oldVal.length != 0 && newVal.length < this.pageCount) {
                this.hasMorePage = false;
            }
            //이전 페이지로 바꾸는 버튼 활성화
            if(oldVal.length != 0 && newVal.length) {
                this.hasPrevPage = true;
            }
            this.displayPageNumValArray.push(newVal, oldVal);
        },
        
    },
    created(){
        this.currentPageIndex = 1;
        this.setPagination(1);
    },
    methods: {
        setPagination(startPage) {
            this.displayPageArray = [];
            console.log('setPagination!!');
            console.log('들어온 값', startPage);
            for(let i = 0; i < this.pagination.pageOption.pageCount; i++) {
                let pageIndex = startPage + i;
                if(pageIndex > this.pagination.totalPage) {
                    break;
                }
                this.displayPageArray.push(pageIndex);
            }
            if(this.pagination.totalPage > this.displayPageArray[this.displayPageArray.length -1 ]) {
                this.hasMorePage = true;
            }
            if(this.pagination.totalPage === this.displayPageArray[this.displayPageArray.length -1 ]) {
                this.hasMorePage = false;
            }
            this.currentPageIndex = startPage;
        },
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex; //현재 보고 있는 페이지 바꿔주기
            this.$emit('changePage', this.currentPageIndex);
        },
        firstPage(e) {
            if(this.currentPageIndex === 1){
                e.preventDefault();
                return;
            }
            this.currentPageIndex = 1;
            this.$emit('changePage', this.currentPageIndex);
            this.setPagination(this.currentPageIndex);
        },
        prevPage(e) {
            if(this.currentPageIndex === 1){
                e.preventDefault();
                return;
            }
            this.currentPageIndex--;
            this.$emit('changePage', this.currentPageIndex);
        },
        nextPage(e) {
            if(this.currentPageIndex === this.pageNum[this.pageNum.length-1]){
                e.preventDefault();
                return;
            }
            this.currentPageIndex++;
            this.$emit('changePage', this.currentPageIndex);
        },
        lastPage(e) {
            this.currentPageIndex = this.pagination.totalPage;
            //시작 페이지 던져주기
            //console.log('마지막 페이지의 시작은?', this.displayPageArray[0]);
            this.$emit('changePage', this.currentPageIndex);
            console.log('다녀옴!');

            let endPage = (Math.ceil(this.currentPageIndex / this.pagination.pageOption.pageCount) * this.pagination.pageOption.pageCount);
            let startPage = (endPage - this.pagination.pageOption.pageCount)+1;

            console.log('시작 페이지?', startPage);
            this.setPagination(startPage);
            if(this.currentPageIndex === this.pagination.totalPage){
                e.preventDefault();
                return;
            }
        },
        loadMorePage() {
            //페이지 그룹 바꾸기
            this.$emit('morePage', this.pagination.endPage + 1);
            this.setPagination(this.pagination.endPage + 1);

        },
        loadPrevPage() {
            console.log('loadPrevPage!!');
        }
    }
}
</script>