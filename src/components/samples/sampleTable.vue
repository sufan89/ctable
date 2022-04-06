<template>
  <div id="myTable"></div>
</template>
<script setup lang="ts">
  import { CTable } from "@/ctable";
  import { onMounted } from "vue";
  let myTable = null;
  const tableConfig: TableConfig = {
    Columns: [
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
    ],
  };
  onMounted(() => {
    myTable = new CTable("myTable", tableConfig);
  });
</script>
<style scoped>
  #myTable {
    height: 100%;
    width: 100%;
  }
</style>
