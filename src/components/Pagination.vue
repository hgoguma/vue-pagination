<template>
    <div class="overflow-auto">
        <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
            <!-- 첫페이지로 버튼-->
            <li class="page-item">
                <button type="button" tabindex="1" aria-controls="my-list" class="page-link" @click="firstPage()" :disabled="this.currentPageIndex == 1? true : false">«</button>
            </li>

            <!-- 이전 페이지 버튼-->
            <li class="page-item">
                <button type="button" tabindex="-1" aria-controls="my-list" class="page-link" @click="prevPage()" :disabled="this.currentPageIndex == 1? true : false">‹</button>
            </li>

            <!--이전 페이지 범위로 이동 -->
            <div v-if="hasPrevPage">
                <li class="page-item">
                    <button type="button" tabindex="1" aria-controls="my-list" class="page-link" @click="loadPrevPage()">...</button>
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
                    <button type="button" tabindex="+1" aria-controls="my-list" class="page-link" @click="loadMorePage()">...</button>
                </li>
            </div>

             <!-- 다음 페이지-->
            <li class="page-item">
                <button type="button" tabindex="+1" aria-controls="my-list" class="page-link" @click="nextPage()" :disabled="this.currentPageIndex == this.pagination.totalPage? true : false">›</button>
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
            currentPageIndex : '',
            pageCount : 5, //먼저 보여줄 페이지 개수
            dataPerPage : 10, //한 페이지당 보여줄 데이터 개수
            displayPageArray : [],
            hasMorePage : false,
            hasPrevPage : false,
            isFirstPage : false,
            isLasgPage : false,
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
        this.currentPageIndex = 1;
        this.setPagination(1);
    },
    methods: {
        setPagination(startPage) {
            this.displayPageArray = [];
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
        },
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex; //현재 보고 있는 페이지 바꿔주기
            this.$emit('changePage', this.currentPageIndex);
        },
        firstPage() {
            this.currentPageIndex = 1;
            this.$emit('changePage', this.currentPageIndex);
            this.setPagination(this.currentPageIndex);
        },
        prevPage() {
            this.currentPageIndex--;
            this.$emit('changePage', this.currentPageIndex);
        },
        nextPage() {
            this.currentPageIndex++;
            this.$emit('changePage', this.currentPageIndex);
        },
        lastPage() {
            this.currentPageIndex = this.pagination.totalPage;
            this.$emit('changePage', this.currentPageIndex);
            let endPage = (Math.ceil(this.currentPageIndex / this.pagination.pageOption.pageCount) * this.pagination.pageOption.pageCount);
            let startPage = (endPage - this.pagination.pageOption.pageCount)+1;
            //시작 페이지 던져주기
            this.setPagination(startPage);
        },
        loadMorePage() {
            this.currentPageIndex = this.pagination.endPage + 1;
            this.$emit('changePage', this.currentPageIndex);
            this.setPagination(this.currentPageIndex);
        },
        loadPrevPage() {
            console.log('loadPrevPage!!');
            this.currentPageIndex = this.pagination.startPage - this.pagination.pageOption.pageCount;
            this.$emit('changePage', this.currentPageIndex);
            let endPage = (Math.ceil(this.currentPageIndex / this.pagination.pageOption.pageCount) * this.pagination.pageOption.pageCount);
            let startPage = (endPage - this.pagination.pageOption.pageCount)+1;
            //시작 페이지 던져주기
            this.setPagination(startPage);
        }
    }
}
</script>