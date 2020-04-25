<template>
    <div class="overflow-auto">
        <ul aria-disabled="false" aria-label="Pagination" class="pagination b-pagination justify-content-center">
            <!-- 첫페이지로, 이전 버튼-->
            <li aria-hidden="true" class="page-item disabled">
                <span aria-label="Go to first page" aria-controls="my-list" aria-disabled="true" class="page-link">«</span>
            </li>
            <li aria-hidden="true" class="page-item disabled">
                <span aria-label="Go to previous page" aria-controls="my-list" aria-disabled="true" class="page-link">‹</span>
            </li>

            <!--페이지 보여주기-->
            <li class="page-item active">
                <button type="button" aria-controls="my-list" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="7" tabindex="0" class="page-link">1</button>
            </li>    
            <li class="page-item">
                <button type="button" aria-controls="my-list" aria-label="Go to page 2" aria-checked="false" aria-posinset="2" aria-setsize="7" tabindex="-1" class="page-link">2</button>            
            </li>            
            
            <!-- 다음 버튼, 끝 페이지로-->
            
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
    props: [],
    data() {
        return {
            perPage: 3,
            currentPage : 1,
            rows : 10,
        }
    }
}
</script>