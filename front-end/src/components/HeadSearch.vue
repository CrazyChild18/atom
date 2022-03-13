<template>
  <el-input
      v-model="search"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input Search Text"
      :prefix-icon="Search"
    ></el-input>
  <el-button type="primary" :icon="Search" style="margin-left: 10px; background-color: orange; border: orange"></el-button>
</template>

<script setup>
import {ref} from "vue";
import { Search } from '@element-plus/icons-vue'
const search = ref('')
</script>

<style scoped>
.el-input{
  margin-top: 15px;
  width: 50%;
  margin-left: 25%;
}
</style>