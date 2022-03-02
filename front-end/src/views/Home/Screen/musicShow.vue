<template>
  <el-table
    height="85vh"
    v-loading="loading"
    element-loading-text="Loading...Please wait and check your network..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%"
  >
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>

</style>