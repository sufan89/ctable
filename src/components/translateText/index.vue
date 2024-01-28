<template>
  <div style="display: flex">
    <el-input v-model="oldValue" type="textarea" :rows="15"></el-input>
    <el-button type="primary" @click="handleChange">转换</el-button>
    <el-input v-model="newValue" type="textarea" :rows="15"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const oldValue = ref(
  "本周六（12月9日）兴盛优选会员日又来啦🎂🎁\n" +
    "🌹🌹🌹🌹🌹🌹🌹🌹🌹\n" +
    "\n" +
    "🍓活动1: 下单满5件且实付金额超过38元！\n" +
    "🍊赠送：三和鑫环保纸碗650m1*20只\n" +
    "\n" +
    "🍓活动2: 下单满5件且实付金额超过68元！\n" +
    "🍊赠送：活力28熏衣芬芳洗衣液2kg\n" +
    "\n" +
    "会员日礼品采购均来于兴盛优选，礼品有任何质量问题一律包退换！感谢邻居们的支持🤝🤝🤝\n" +
    "点击 #小程序:兴盛优选 下单"
);
const newValue = ref("");
const keyWords = [
  "下单",
  "兴盛优选",
  "会员日",
  "邻居们",
  "活动",
  "满赠",
  "赠送",
  "支持",
];
const translateKeys = [
  "&#8206",
  "&#8207",
  "&#8205",
  "&#8204",
  "&#8234",
  "&#8235",
  "&#8237",
  "&#8238",
  "&#8236",
  "&#8302",
  "&#8303",
  "&#8299",
  "&#8298",
  "&#8301",
  "&#8300",
  "&#30",
  "&#31",
];
const handleChange = () => {
  // 先将文本装换成Unicode
  const textValue = oldValue.value.split("\n");
  newValue.value = textValue
    .map((line) => {
      return randomTranslate(line);
    })
    .join("\n");
};

function translateTextLine(val: string): string {
  let tempVal: string = val;
  if (tempVal.length > 0) {
    // 随机取两个文字进行转码
    keyWords.forEach((key) => {
      if (tempVal.includes(key)) {
        tempVal = tempVal.replace(key, unescape(`\u202E${escape(key)}\u202C`));
      }
    });
  }
  return tempVal;
}
/*
 * 随机添加
 * */
function randomTranslate(val: string) {
  const tempVal: string = val;
  if (tempVal.length > 0) {
    // 随机取两个文字进行转码
    const index = Math.floor(Math.random() * (tempVal.length + 1));
    let tempChart = "";
    if (index + 3 > tempVal.length) {
      tempChart = tempVal.substring(0, index + 3);
    } else {
      tempChart = tempVal.substring(index, index + 3);
    }
    tempVal.replace(tempChart, unescape(`\u202E${escape(tempChart)}`));
  }
  return tempVal;
}
</script>

<style scoped></style>
