<template>
    <b-container class="text-center">
        <div class="overflow-auto">
            <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
                <!-- 첫페이지로 버튼-->
                <li class="page-item">
                    <button type="button" tabindex="-1" class="page-link" @click="firstPage()" :disabled="this.currentPageIndex == 1? true : false">«</button>
                </li>

                <!-- 이전 페이지 버튼-->
                <li class="page-item">
                    <button type="button" tabindex="-1" class="page-link" @click="prevPage()" :disabled="this.currentPageIndex == 1? true : false">‹</button>
                </li>

                <!--이전 페이지 범위로 이동 -->
                <div v-if="hasPrevPage">
                    <li class="page-item">
                        <button type="button" tabindex="-1" class="page-link" @click="loadPrevPage()">...</button>
                    </li>
                </div>

                <!--페이지 범위 보여주기-->
                <div v-for="(pageIndex, index) in displayPageArray" v-bind:key="index">
                    <li class="page-item" :class="{ 'active' : pageIndex === currentPageIndex }">
                        <button type="button" aria-checked="true" tabindex="-1" class="page-link" @click="changePage(pageIndex)">{{pageIndex}}</button>
                    </li>
                </div>

                <!-- 앞 페이지 범위로 이동 -->
                <div v-if="hasMorePage">
                    <li class="page-item">
                        <button type="button" tabindex="-1" class="page-link" @click="loadMorePage()">...</button>
                    </li>
                </div>

                <!-- 다음 페이지-->
                <li class="page-item">
                    <button type="button" tabindex="-1" class="page-link" @click="nextPage()" :disabled="this.currentPageIndex == this.totalPage? true : false">›</button>
                </li>

                <!-- 맨 마지막 페이지로 이동-->
                <li class="page-item">
                    <button type="button" tabindex="-1" class="page-link" @click="lastPage()" :disabled="this.currentPageIndex == this.totalPage? true : false">»</button>
                </li>
            </ul>
        </div>
    </b-container>
</template>

<script>
export default {
    computed : {
        currentPageIndex : {
            get() { return this.$store.state.page.currentPageIndex },
            set(value) {  return this.$store.commit('page/currentPageIndex', value) },
        },
        pageOption : {
            get() {
                return this.$store.getters['page/getPageOption']
            },
            set(newVal) {
                return this.$store.dispatch('page/setPageOptionRequest', newVal);
            }
        },
        totalPage : {
            get() {
                return this.$store.getters['page/getTotalPage']
            },
            set(newVal) {
                return this.$store.dispatch('page/setTotalPageRequest', newVal);
            }
        },
        pageRange : {
            get() {
                return this.$store.getters['page/getPageRange']
            },
            set(newVal) {
                return this.$store.dispatch('page/setPageRange', newVal);
            }
        },
        displayPageArray : {
            get() {
                return this.$store.getters['page/getDisplayPageArray']
            },
            set(newVal) {
                return this.$store.dispatch('page/setDisplayPageArray', newVal);
            }
        },
        hasMorePage : {
            get() {
                return this.$store.getters['page/getHasMorePage']
            },
            set(newVal) {
                return this.$store.commit('page/setHasMorePage', newVal);
            }
        },
        hasPrevPage : {
            get() {
                return this.$store.getters['page/getHasPrevPage']
            },
            set(newVal) {
                return this.$store.commit('page/setHasPrevPage', newVal);
            }
        }
    },
    methods: {
        //click 이벤트 함수
        changePage(pageIndex) {
            this.currentPageIndex = pageIndex; //현재 페이지 상태를 변경해줌
            this.$emit('renderingPage');
        },
        firstPage() {
            this.currentPageIndex = 1;
            this.$emit('renderingPage');
        },
        prevPage() {
            this.currentPageIndex--;
            this.$emit('renderingPage');
        },
        nextPage() {
            this.currentPageIndex++;
            this.$emit('renderingPage');
        },
        lastPage() {
            this.currentPageIndex = this.totalPage;
            this.$emit('renderingPage');
        },
        loadMorePage() {
            this.currentPageIndex = this.pageRange[1] + 1;
            this.$emit('renderingPage');
        },
        loadPrevPage() {
            this.currentPageIndex = this.pageRange[0] - this.pageOption.pageCount;
            this.$emit('renderingPage');
        },
    }
}
</script>