<template>

  <!--采用左右布局，左边为歌词，右边为图片或mv-->
  <!--reference: https://element-plus.gitee.io/zh-CN/component/container.html#%E5%B8%B8%E8%A7%81%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80-->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">歌词部分</el-aside>
      <el-main>歌曲MV或图片</el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "MusicContent"
}
</script>

<style scoped>

</style>