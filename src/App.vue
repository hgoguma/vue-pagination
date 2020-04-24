<template>
  <div id="app">
    
    <Header></Header>
    <b-container >
      
      <List></List>
    <!-- <Table></Table> -->
    <!-- <Pagination></Pagination> -->
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
//import Table from './components/Table.vue'
import List from './components/List.vue'
//import Pagination from './components/Pagination.vue'




export default {
  name: 'App',
  components: {
    Header,
    // Table,
    List,
    //Pagination
  }
}
</script>
