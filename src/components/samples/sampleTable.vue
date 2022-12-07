<template>
  <div id="myTable"></div>
</template>
<script setup lang="ts">
import { CTable } from "@/ctable";
import { onMounted } from "vue";

let myTable = null;
const tableConfig: CTable.TableConfig = {
  Columns: [
    {
      label: "注册名称",
      prop: "companyName",
      align: "left",
    },
    {
      label: "公司编码",
      prop: "companyCode",
      align: "left",
    },
    {
      label: "证件号码",
      width: "200",
      prop: "accountId",
      align: "right",
    },
    {
      label: "开通电子合同服务状态",
      width: "180",
      prop: "openStatus",
      align: "left",
    },
    {
      label: "税务编码",
      prop: "taxIdentifyNo",
      align: "right",
    },
    {
      label: "开通时间",
      prop: "openTime",
      align: "left",
    },
    {
      label: "创建时间",
      prop: "createdTime",
      align: "center",
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      align: "center",
    },
  ],
};
const tableData: Array<object> = [];
onMounted(() => {
  /*
   * 初始化1千条数据进行渲染
   * */
  for (let i = 0; i < 1000; i++) {
    let item = {};
    if (i === 0) {
      item = {
        companyCode: "HTYL",
        companyName:
          "湖南昊途运力信息科技有限公司湖南昊途运力信息科技有限公司湖南昊途运力信息科技有限公司湖南昊途运力1",
        accountId: "91430100MA4QJW5X0R",
        taxIdentifyNo: null,
        openStatus: 1,
        openTime: "2021-05-03 14:09:26",
        createdTime: "2021-05-03 14:09:26",
        updatedTime: "2021-05-03 14:09:26",
      };
    } else {
      item = {
        companyCode: "YMSY",
        companyName: `湖南省优脉实业有限公司${i + 1}`,
        accountId: "91430921MA4T6WCH6N",
        taxIdentifyNo: null,
        openStatus: 1,
        openTime: "2021-05-03 14:09:26",
        createdTime: "2021-05-03 14:09:26",
        updatedTime: "2021-05-03 14:09:26",
      };
    }
    tableData.push(item);
  }
  myTable = new CTable("myTable", tableConfig);
  myTable.setTableData(tableData);
})
</script>
<style scoped>
#myTable {
  height: 100%;
  width: 100%;
}
</style>
