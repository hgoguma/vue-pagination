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

            <!--페이지 보여주기-->
            <div v-for="(pageIndex, index) in pageNum" v-bind:key="index">
                <div v-if="pageIndex <= pageRange">
                    <li class="page-item" :class="{ 'active' : pageIndex === currentPageIndex }">
                        <button type="button" aria-controls="my-list" aria-checked="true" tabindex="0" class="page-link" @click="changePage(pageIndex)">{{pageIndex}}</button>
                    </li>
                </div>
            </div>

            <!-- 페이지 더 보여주기 -->
            <div v-if="hasMorePage">
                <li class="page-item">
                    <button type="button" tabindex="+1" aria-controls="my-list" class="page-link" @click="morePage()">...</button>
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
            totalPage : '', //총 페이지 수
            pageRange : 5, //먼저 보여줄 페이지 개수
            listCount : 10, //한 페이지당 보여줄 데이터 개수
            pageNum : [], //총 페이지 개수 만큼 배열
            hasMorePage : false,
            startPage : '', 
            endPage : '',
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
            //첫번째 페이지로 설정
            this.currentPageIndex = 1;
            
            //hasMorePage 설정
            if(this.pageNum.length > this.pageRange) {
                this.hasMorePage = true;
            }
            //pageRange 설정
            this.setPageRange(this.currentPageIndex);
        },
        setPageRange(currentPageIndex){
            //현재 페이지를 기준으로 start Page, end Page 설정하기
            this.endPage = (Math.ceil(currentPageIndex / this.pageRange) * this.pageRange);
            this.startPage = (this.endPage - this.pageRange)+1;
            console.log('endPage?', this.endPage);
            console.log('startPage?', this.startPage);
        },
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex; //현재 보고 있는 페이지 바꿔주기
            this.$emit('changePage', this.currentPageIndex);
        },
        firstPage(e) {
            this.currentPageIndex = this.pageNum[0];
            this.$emit('changePage', this.currentPageIndex);
            if(this.currentPageIndex === this.pageNum[0] ){
                e.preventDefault();
                return;
            }
        },
        prevPage(e) {
            if(this.currentPageIndex === this.pageNum[0] ){
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
            this.currentPageIndex = this.pageNum[this.pageNum.length-1];
            this.$emit('changePage', this.currentPageIndex);
            if(this.currentPageIndex === this.pageNum[this.pageNum.length-1]){
                e.preventDefault();
                return;
            }
        },
        morePage() {
            //페이지 처리 된 부분 123 -> 45로 보여주기
            this.setPageRange(this.currentPageIndex);

            //... 페이지 보여주기

            //만약에 더 보여줄 페이지가 있으면 morePage 계속 보여줘야됨,,,

        }
    }
}
</script>