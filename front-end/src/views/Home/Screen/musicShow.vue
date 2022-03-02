<template>
  <!--加载缓冲-->
<!--  <el-table-->
<!--    height="85vh"-->
<!--    v-loading="loading"-->
<!--    element-loading-text="Loading...Please wait and check your network..."-->
<!--    element-loading-background="rgba(0, 0, 0, 0.8)"-->
<!--    style="width: 81vw; position: absolute; "-->
<!--  >-->
<!--  </el-table>-->

  <!--轮播图-->
  <el-carousel height="85vh" direction="vertical" :autoplay="false" arrow="hover" loop="false" trigger="click">
    <el-carousel-item v-for="item in 16" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
// import { ref } from 'vue'
// const loading = ref(true)
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  height: 85vh;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>