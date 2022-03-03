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
  <el-carousel ref="nop" height="85vh" direction="vertical" :autoplay="false" arrow="always" loop="false" trigger="click">
    <el-carousel-item v-for="item in 16" :key="item">
      <div class="btndiv">
        <div id="btn_up" @click="this.$refs.nop.prev();"><img height="70" src="../../../assets/up.png"></div>
              <h3>{{ item }}</h3>
        <div id="btn_down" @click="this.$refs.nop.next();"><img height="70" src="../../../assets/down.png"></div>
      </div>

</el-carousel-item>
  </el-carousel>
</template>

<script setup>
// export default {
//   data() {
//     return {
//         upUrl:require("../../../assets/up.png")
//      }
// }
//   // require upUrl from
// }

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  /*height: 85vh;*/
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#btn_up, #btn_down {
  text-align: center;
  opacity: 0.75;

}
#btn_down {
  margin: 20vh;
}
</style>