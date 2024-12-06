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
      cellType: "checkbox",
      prop: "rowSelect",
      fixed: "left",
    },
    {
      label: "注册名称",
      prop: "companyName",
      align: "start",
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
      align: "left",
    },
    {
      label: "开通电子合同服务状态",
      width: "180",
      prop: "openStatus",
      align: "center",
    },
    {
      label: "税务编码",
      prop: "taxIdentifyNo",
      align: "left",
    },
    {
      label: "详细信息",
      prop: "detail",
      align: "center",
      children: [
        {
          label: "开通时间",
          prop: "openTime",
          align: "center",
          width: "180",
        },
        {
          label: "创建时间",
          prop: "createdTime",
          align: "right",
          width: "180",
        },
        {
          label: "更新时间",
          prop: "updatedTime",
          align: "right",
          width: "180",
        },
      ],
    },
    {
      label: "开通时间",
      prop: "openTime",
      align: "center",
      width: "180",
    },
    {
      label: "创建时间",
      prop: "createdTime",
      align: "right",
      width: "180",
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      align: "right",
      width: "180",
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      align: "right",
      width: "180",
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      align: "right",
      width: "180",
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      align: "right",
      width: "180",
    },
    {
      label: "更新时间1",
      prop: "updatedTime",
      align: "right",
      width: "180",
      fixed: "right",
    },
  ],
};
const tableData: Array<CTable.rowValueType> = [];
onMounted(() => {
  /*
   * 初始化1千条数据进行渲染
   * */
  for (let i = 0; i < 10000; i++) {
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
});
</script>
<style scoped>
#myTable {
  height: 500px;
  width: 100%;
  /*border: 1px #2c3e50 solid;*/
}
</style>
