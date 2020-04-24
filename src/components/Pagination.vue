<template>
    <div class="overflow-auto">
        <div class="mt-3">
            <h6>Default</h6>
            <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
        </div>
    </div>
</template>