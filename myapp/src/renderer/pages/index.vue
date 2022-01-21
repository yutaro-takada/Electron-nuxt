<template>
  <div id="app">
  <vue-good-table 
  @on-selected-rows-change="selectionChanged"
  :columns="columns"
  :rows="rows"
  :select-options="{ enabled: true }"
  :search-options="{ enabled: true }"
  styleClass="vgt-table bordered"
  >
  <div slot="selected-row-actions">
    <button>Action</button>
  </div>
  </vue-good-table>
</div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import appHeader from '@/components/header'
export default {
  components: {
    appHeader,
    VueGoodTable,
  },
  data () {
    return {
      columns: [
        {
        label: 'id',
        field: 'id',
        type: 'number',
      },
      {
        label: 'Name',
      　field: 'name',
      },
      {
        label: 'Email',
        field: 'email',
      },
      // {
      //   label: 'Created On',
      //   field: 'createdAt',
      //   type: 'date',
      //   dateInputFormat: 'yyyy-MM-dd',
      //   dateOutputFormat:'YYYY-MM-DD',
      // },
      {
        label: 'Percent',
        field: 'score',
        type: 'percentage',
      },
      ],
      rows: [
      { id:1, name:"John", age: 20, createdAt: '2021-10-31',score: 0.03343 },
      { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
      { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
      { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
      { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ]
      }
    },
    methods:{
      onRowClick : function(params) {
      alert('RowClick');
    },
    }
};
</script>

<style>

</style>
